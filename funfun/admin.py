from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Item, Investment, Comment

# Register your models here.
# admin.site.unregister(User)  # 기본 User 모델을 먼저 등록 해제합니다.
# admin.site.register(User, UserAdmin)  # 기본 User 모델을 관리자에 등록합니다.
admin.site.register(Item)
admin.site.register(Investment)
admin.site.register(Comment)