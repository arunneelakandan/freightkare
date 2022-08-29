from django.urls import path
from .views import GetUserProfileView, UpdateUserProfileView,ForgotUserPasswordView, ChangeUserPasswordView

urlpatterns = [
    path('user', GetUserProfileView.as_view()),
    path('update', UpdateUserProfileView.as_view()),
    path('forgotpassword/', ForgotUserPasswordView.as_view()),
    path('changepassword/<str:token>', ChangeUserPasswordView.as_view()),
]