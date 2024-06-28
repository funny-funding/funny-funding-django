from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from funfun.models import Item


class UserForm(UserCreationForm):
    email = forms.EmailField(label="이메일")

    class Meta:
        model = User
        fields = ("username", "password1", "password2", "email")

class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = ("name", "type", "company", "description", "price", "end_period")