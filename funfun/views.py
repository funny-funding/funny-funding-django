from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

from funfun.forms import LoginForm, CustomUserCreationForm
from funfun.models import Item, User

from django.contrib.auth.views import LoginView as AuthLoginView
from django.contrib.auth.forms import UserCreationForm

from django.contrib.auth import login

class LoginView(View):
    template_name = 'funfun/login.html'

    def get(self, request):
        form = LoginForm()
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = User.objects.filter(email=email).first()
            if user and user.password == password:
                login(request, user)
                return redirect('funfun:item_list')
            else:
                form.add_error(None, 'Invalid email or password')
        return render(request, self.template_name, {'form': form})

class JoinView(CreateView):
    form_class = CustomUserCreationForm
    template_name = 'funfun/join.html'
    success_url = reverse_lazy('funfun:login')

    def form_valid(self, form):
        response = super().form_valid(form)
        user = form.save()
        login(self.request, user)
        return response

class ItemListView(ListView):
    model = Item

class ItemCreateView(CreateView):
    model = Item
    fields = '__all__'
    template_name_suffix = '_create'
    success_url = reverse_lazy('funfun:item_list')

class ItemUpdateView(UpdateView):
    model = Item
    fields = '__all__'
    template_name_suffix = '_update'
    success_url = reverse_lazy('funfun:item_list')

class ItemDeleteView(DeleteView):
    model = Item
    success_url = reverse_lazy('funfun:item_list')