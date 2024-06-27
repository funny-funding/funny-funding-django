from django.urls import path

from funfun import views
from django.contrib.auth import views as auth_views

app_name = 'funfun'

urlpatterns = [
    # path('', views.LoginView.as_view(), name='login'),
    path('', auth_views.LoginView.as_view(template_name='funfun/login.html'), name='login'),
    path('signup/', views.signup, name='signup'),
    path('list/', views.ItemListView.as_view(), name='item_list'),
    path('create/', views.ItemCreateView, name='item_create'),
    path('update/<int:pk>', views.ItemUpdateView.as_view(), name='item_update'),
    path('delete/<int:pk>', views.ItemDeleteView.as_view(), name='item_delete'),
    path('mypage/', views.MypageView.as_view(), name='mypage'),
]
