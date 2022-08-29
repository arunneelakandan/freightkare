# from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect

from .global_variables import *

def unauthenticated_user(view_func):
    def wrapper_func(self, *args,**kwargs):
        if self.request.user.is_authenticated:
            return view_func(self, *args,**kwargs)
        else:
            return Response({'is_authenticated': self.request.user.is_authenticated}, status=status.HTTP_401_UNAUTHORIZED)
    return wrapper_func