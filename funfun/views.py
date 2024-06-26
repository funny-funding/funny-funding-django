from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

from funfun.models import Item


# Create your views here.
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