from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'funfun'

urlpatterns = [
    path('', views.CustomLoginView.as_view(), name='login'),
    path('signup/', views.signup, name='signup'),
    path('list/', views.ItemListView, name='item_list'),
    path('create/', views.ItemCreateView, name='item_create'),
    path('update/<int:pk>/', views.ItemUpdateView, name='item_update'),
    path('delete/<int:pk>/', views.ItemDeleteView.as_view(), name='item_delete'),
    path('mypage/', views.MypageView.as_view(), name='mypage'),
    path('detail/<int:pk>/', views.ItemDetailView.as_view(), name='item_detail'),
    path('detail/<int:pk>/add_comment/', views.add_comment, name='add_comment'),
    path('edit_comment/<int:pk>/', views.edit_comment, name='edit_comment'),
    path('delete_comment/<int:pk>/', views.delete_comment, name='delete_comment'),
    path('add_funding/<int:item_id>/', views.add_funding, name='add_funding'),# funding 금액 제출
]
