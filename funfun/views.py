from django.contrib import auth, messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Q
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate
from django.utils.decorators import method_decorator
from django.views import View
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, UpdateView, DeleteView, DetailView

from .forms import UserForm, ItemForm
from .models import Item, Comment, Investment


def ItemListView(request):
    category = request.GET.get('category', '')
    search = request.GET.get('search', '')

    if category == '':
        items = Item.objects.all()
    else:
        try:
            category = int(category)
            items = Item.objects.filter(type=category)
        except ValueError:
            items = Item.objects.all()

    if search:
        items = items.filter(Q(name__icontains=search))

    # 아이템 정렬
    items = items.order_by('-end_period', '-created_at')

    context = {
        'items': items,
        'selected_category': category,
    }
    return render(request, 'funfun/item_list.html', context)


@login_required
def ItemCreateView(request):
    if request.method == 'POST':
        form = ItemForm(request.POST, request.FILES)
        if form.is_valid():
            item = form.save(commit=False)
            item.user = request.user
            item.target_num = 0
            item.save()
            return redirect('funfun:item_list')

    else:
        form = ItemForm()
    context = {'form': form}
    return render(request, 'funfun/item_create.html', context)


@login_required
@login_required
def add_funding(request, item_id):
    if request.method == 'POST':
        item = get_object_or_404(Item, id=item_id)
        amount = int(request.POST.get('amount'))
        item.current_price += amount
        item.save()

        # 사용자가 이미 투자한 내역이 있는지 확인
        investment = Investment.objects.filter(user=request.user, item=item).first()
        if investment:
            investment.amount += amount
            investment.save()
        else:
            Investment.objects.create(user=request.user, item=item, amount=amount)

        # 투자자 수 업데이트
        item.participant_num = Investment.objects.filter(item=item).count()
        item.save()

        return redirect('funfun:item_detail', pk=item_id)
    return redirect('funfun:item_detail', pk=item_id)


class ItemUpdateView(UpdateView):
    model = Item
    fields = '__all__'
    template_name_suffix = '_update'
    success_url = reverse_lazy('funfun:item_list')


class ItemDeleteView(DeleteView):
    model = Item
    success_url = reverse_lazy('funfun:mypage')

    def get_queryset(self):
        return Item.objects.filter(user=self.request.user)


def signup(request):
    if request.method == 'POST':
        if request.POST['password1'] == request.POST['password2']:
            user = User.objects.create_user(
                username=request.POST['username'],
                password=request.POST['password1'],
                email=request.POST['email'], )
            auth.login(request, user)
            return redirect('/funfun/list')
        return render(request, 'funfun/signup.html')
    return render(request, 'funfun/signup.html')


@method_decorator(login_required, name='dispatch')  # 사용자 인증이 안 되어 있다면 로그인 페이지로 redirect 되는 데코레이터
class MypageView(View):
    template_name = 'funfun/mypage.html'

    def get(self, request):
        user_items = Item.objects.filter(user=request.user)
        context = {
            'username': request.user.username,
            'user_items': user_items,
        }
        print(context.get('user_items'))
        return render(request, self.template_name, context)


class ItemDetailView(DetailView):
    model = Item
    template_name = 'funfun/item_detail.html'
    context_object_name = 'item'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['comments'] = Comment.objects.filter(item=self.object)
        return context


@login_required
def add_comment(request, pk):
    item = get_object_or_404(Item, pk=pk)
    if request.method == 'POST':
        content = request.POST.get('content')
        if content:
            Comment.objects.create(user=request.user, item=item, content=content)
    return redirect('funfun:item_detail', pk=pk)


@login_required
def edit_comment(request, pk):
    comment = get_object_or_404(Comment, pk=pk)
    if request.user != comment.user:
        return redirect('funfun:item_detail', pk=comment.item.pk)
    if request.method == 'POST':
        content = request.POST.get('content')
        if content:
            comment.content = content
            comment.save()
            messages.success(request, '댓글이 수정되었습니다.')
            return redirect('funfun:item_detail', pk=comment.item.pk)
    context = {'comment': comment}
    return render(request, 'funfun/item_detail.html', context)


@login_required
def delete_comment(request, pk):
    comment = get_object_or_404(Comment, pk=pk)
    if request.user == comment.user:
        comment.delete()
        messages.success(request, '댓글이 삭제되었습니다.')
    return redirect('funfun:item_detail', pk=comment.item.pk)
