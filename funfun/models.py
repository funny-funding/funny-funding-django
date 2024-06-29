from django.contrib.auth.models import AbstractUser, User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.IntegerField(default=50000)  # 초기 잔액을 50000원으로 설정

    def __str__(self):
        return f'{self.user.username} Profile'

class Item(models.Model):
    TYPE_CHOICES = [
        (0, 'IT'),
        (1, '건강'),
        (2, '음식'),
        (3, '엔터테인먼트'),
        (4, '사회'),
        (5, '디자인 및 패션'),
        (6, '농업'),
        (7, '기타'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    type = models.PositiveSmallIntegerField(choices=TYPE_CHOICES, default=0)
    company = models.CharField(max_length=254, null=True, blank=True)
    description = models.TextField()
    price = models.IntegerField()
    current_price = models.IntegerField(default=0, blank=True)
    participant_num = models.IntegerField(default=0, blank=True)
    start_period = models.DateTimeField(auto_now_add=True)
    end_period = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='images/', default='')

    def __str__(self):
        return f'{self.user} {self.name} {self.get_type_display()} {self.company} {self.description} {self.price} {self.current_price} {self.participant_num} {self.start_period} {self.end_period} {self.created_at} {self.updated_at}'


class Investment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    amount = models.IntegerField()

    def __str__(self):
        return f'{self.user} {self.item} {self.amount}'


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self):
        return f'{self.user} {self.item} {self.content}'
