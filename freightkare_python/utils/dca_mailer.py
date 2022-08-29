
from django.core.mail import BadHeaderError, send_mail
from django.conf import settings
from django.http import HttpResponse

from utils.global_variables import IP_ADDRESS

def send_forget_password_mail(email, token, ip_link):

    subject = 'Your forget password link'
    message = f'Hi, click on the link to reset your password.{ip_link}/resetpassword/{token}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    if subject and message and email_from:
        try:
            send_mail(subject, message, email_from, recipient_list,fail_silently=False)
            return True
        except BadHeaderError:
            # to prevent Header injection.
            return HttpResponse('Invalid Header Found.')
    


