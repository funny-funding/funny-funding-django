from django.contrib import admin

from funfun.models import User, Item, Investment, Comment

# Register your models here.
admin.site.register(User)
admin.site.register(Item)
admin.site.register(Investment)
admin.site.register(Comment)