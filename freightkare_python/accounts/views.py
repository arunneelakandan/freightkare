# Django Packages
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib import auth
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.utils.decorators import method_decorator
# from rest_framework.authentication import  BasicAuthentication
# Django Packages

# UDF Packages
from user_profile.models import UserProfile
from .serializers import UserSerializer
from utils import unauthenticated_user
# from utils.disable_csrf import CsrfExemptSessionAuthentication
# UDF Packages


class CheckAuthenticatedView(APIView):
    # * Ignores CSRF Authentication
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    @unauthenticated_user
    def get(self, request, format=None):
        user = self.request.user
        return Response({'is_authenticated': self.request.user.is_authenticated, 'username': user.username, 'first_name': user.first_name, 'server_port': self.request.META['SERVER_PORT']})


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    # * Ignores CSRF Authentication
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        re_password = data['re_password']
        first_name = data['first_name']

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'is_authenticated': self.request.user.is_authenticated, 'status': False, 'message': 'Username already exists'}, status=status.HTTP_409_CONFLICT)
                else:
                    if len(password) < 6:
                        return Response({'is_authenticated': self.request.user.is_authenticated, 'status': False, 'message': 'Password must be at least 6 characters'}, status=status.HTTP_406_NOT_ACCEPTABLE)
                    else:
                        user = User.objects.create_user(
                            username=username, password=password, first_name=first_name, email=username)
                        user = User.objects.get(id=user.id)
                        user_profile = UserProfile.objects.create(
                            user=user, first_name=first_name, last_name='', phone='', city='')
                        return Response({'is_authenticated': self.request.user.is_authenticated, 'status': True, 'message': 'User created successfully'})
            else:
                return Response({'is_authenticated': self.request.user.is_authenticated, 'status': False, 'message': 'Passwords do not match'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response({'is_authenticated': self.request.user.is_authenticated, 'status': False,  'message': 'Something went wrong when registering account'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    # * Ignores CSRF Authentication
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({'is_authenticated': self.request.user.is_authenticated, 'status': True, 'message': 'Logged in sucessfully'})
            else:
                return Response({'is_authenticated': self.request.user.is_authenticated, 'status': False, 'message': 'Logged in failed'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'is_authenticated': self.request.user.is_authenticated, 'status': False,  'message': 'Something went wrong when logging in'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LogoutView(APIView):
    # * Ignores CSRF Authentication
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    def get(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'is_authenticated': self.request.user.is_authenticated, 'status': True, 'message': 'Logged out successfully'})
        except:
            return Response({'is_authenticated': self.request.user.is_authenticated, 'status': False, 'message': 'Something went wrong when logging out'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    # * Ignores CSRF Authentication
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'is_authenticated': self.request.user.is_authenticated, 'status': True, 'message': 'CSRF cookie set'})


class DeleteAccountView(APIView):
    # * Ignores CSRF Authentication
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()
            return Response({'is_authenticated': self.request.user.is_authenticated, 'status': True, 'message': 'User deleted successfully'})
        except:
            return Response({'is_authenticated': self.request.user.is_authenticated, 'status': False,  'message': 'Something went wrong when trying to delete user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetUsersView(APIView):
    # * Ignores CSRF Authentication
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        users = User.objects.all()

        users = UserSerializer(users, many=True)
        return Response(users.data)
