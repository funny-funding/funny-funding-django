from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.utils.decorators import method_decorator
from django.views import View
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, UpdateView, DeleteView

from .forms import UserForm, ItemForm
from .models import Item

# class SignUpView(CreateView):
#     form_class = CustomUserCreationForm
#     template_name = 'funfun/signup.html'
#     success_url = reverse_lazy('funfun:item_list')
#
#     def form_valid(self, form):
#         user = form.save()
#         login(self.request, user)
#         return redirect(self.success_url)

# class LoginView(View):
#     form_class = CustomUserCreationForm
#     template_name = 'funfun/login.html'
#
#     def get(self, request):
#         form = self.form_class()
#         return render(request, self.template_name, {'form': form})
#
#     def post(self, request):
#         form = self.form_class(data=request.POST)
#         if form.is_valid():
#             username = form.cleaned_data['username']
#             password = form.cleaned_data['password']
#             user = authenticate(request, username=username, password=password)
#             if user is not None:
#                 login(request, user)
#                 return redirect('funfun:item_list')
#             else:
#                 form.add_error(None, '이메일 또는 비밀번호가 유효하지 않습니다.')
#         return render(request, self.template_name, {'form': form})
#
class ItemListView(ListView):
    model = Item
    template_name = 'funfun/item_list.html'
    context_object_name = 'items'

    def get_queryset(self):
        # 현재 로그인한 사용자만의 아이템을 반환합니다.
        return Item.objects.filter(user=self.request.user)

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
                                            email=request.POST['email'],)
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
            'username' : request.user.username,
            'user_items': user_items,
        }
        print(context.get('user_items'))
        return render(request, self.template_name, context)
