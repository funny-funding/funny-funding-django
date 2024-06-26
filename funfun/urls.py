from django.urls import path

from funfun import views

app_name = 'funfun'

urlpatterns = [
    path('', views.ItemListView.as_view(), name='item_list'),
    path('create/', views.ItemCreateView.as_view(), name='item_create'),
    path('update/<int:pk>', views.ItemUpdateView.as_view(), name='item_update'),
    path('delete/<int:pk>', views.ItemDeleteView.as_view(), name='item_delete'),
]