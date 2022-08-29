from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # newly added for forgetpassword module
    forget_password_token = models.CharField(max_length = 100, default='')
    token_time = models.DateTimeField(null=True, blank=True)
    # status = models.IntegerField(default='')
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    phone = models.CharField(max_length=20, default='')
    city = models.CharField(max_length=20, default='')

    def __str__(self):
        return self.first_name