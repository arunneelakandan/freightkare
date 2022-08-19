# Django Packages
from rest_framework.views import APIView
from rest_framework.response import Response

# from rest_framework.authentication import  BasicAuthentication 
# Django Packages

# UDF Packages
from .models import UserProfile
from .serializers import UserProfileSerializer
# from utils.disable_csrf import CsrfExemptSessionAuthentication
# UDF Packages
# added extra for forgot pswd.
from django.contrib.auth.models import User
from django.contrib import messages
import uuid
import datetime
# mail connector
from utils import *
from django.shortcuts import render, redirect
from django.utils import timezone

class GetUserProfileView(APIView):
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    def get(self, request, format=None):
        try:
            user = self.request.user
            username = user.username

            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response({ 'profile': user_profile.data, 'username': str(username) })
        except:
            return Response({ 'error': 'Something went wrong when retrieving profile' })

class UpdateUserProfileView(APIView):
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    def put(self, request, format=None):
        try:
            user = self.request.user
            username = user.username

            data = self.request.data
            first_name = data['first_name']
            last_name = data['last_name']
            phone = data['phone']
            city = data['city']

            UserProfile.objects.filter(user=user).update(first_name=first_name, last_name=last_name, phone=phone, city=city)

            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response({ 'profile': user_profile.data, 'username': str(username) })
        except:
            return Response({ 'error': 'Something went wrong when updating profile' })
        
class ChangeUserPasswordView(APIView):

    def post(self, request, token, format = None):
        profile_obj = UserProfile.objects.filter(forget_password_token = token).first()
        user_id = profile_obj.id
        context = {'user_id' : user_id}

        try:
            # print(f" token_generated time is:{profile_obj.token_time}")
            generated_time  = profile_obj.token_time
            # status = profile_obj.status + 1
            # print(status)
            an_hour_ahead = datetime.timedelta(minutes = 60)
            token_valid_till = generated_time + an_hour_ahead
            time_now = datetime.datetime.now()
            # print(f"token_valid till is:{token_valid_till}")

            # print(f"now the time is:{time_now}")
            if time_now > token_valid_till:
                return Response({'status':False,'message':'Token Time Ended. Please try again.'})
                # return redirect(reverse('accounts:forgot_password', kwargs = {'context':context}))
                # return HttpResponseRedirect(reverse('accounts:forget_password',kwargs = {'messages':messages}))
            if time_now < token_valid_till:
                post_data = self.request.data
                new_password = post_data['new_password']
                confirm_password = post_data['reconfirm_password']
                user_id = user_id
                if user_id is None:
                    return Response({'status':False,'message':'No user id found.'})
                if new_password != confirm_password:
                    return Response({'status':False, 'message':'Both Password should be equal.'})
                user_obj = User.objects.get(id = user_id)
                user_obj.set_password(new_password)
                user_obj.save()
                return Response({'status':True,'message':'Password Changed Succesfully.'}) 
            else:
                return Response({'status':False,'message':'Error'})

            
        except Exception as e:
            print(e)
            return Response({'status': True,'message':'Please enter new password.','context':context,})
    
class ForgotUserPasswordView(APIView):
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    def post(self, request, *args, **kwargs):
        try:
            post_data = self.request.data
            email = post_data['email']
            if not User.objects.filter(email = email).first():
                return Response({'status':False,'message':'No User found with this email.'})

            print(User.objects.filter(email=email).first())
            # timezone used instead of datetime to avoid runtime warning.
            now_time = timezone.now()
            token = str(uuid.uuid4())
            # status = 0
            user_obj = User.objects.get(email = email)
            print(user_obj.username, user_obj.email, user_obj.password)
            profile_obj = UserProfile.objects.get(user = user_obj.id)
            profile_obj.token_time = now_time
            profile_obj.forget_password_token = token
            # profile_obj.status = status
            profile_obj.save()
            link_addr = request.META['HTTP_REFERER']
            ip_link = link_addr.split('/',-1)
            ip_link = ip_link[0] + '//'+ip_link[2]
            print(ip_link)
            dca_mailer.send_forget_password_mail(user_obj.email, token, ip_link)
            return Response({'status':True,'message':'Email is send.'})
            
        except Exception as e:
            print("the error is: ",e)
        # return render(request, 'forgot-password.html')
        return Response({'status':True,'message':'Email is send.'}) 
        