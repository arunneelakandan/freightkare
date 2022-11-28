# Django Packages
from rest_framework.views import APIView
from rest_framework.response import Response

# from rest_framework.authentication import  BasicAuthentication
# Django Packages

# UDF Packages
from .models import *
from .serializers import *
# from utils.disable_csrf import CsrfExemptSessionAuthentication
# UDF Packages
# added extra for forgot pswd.
from django.contrib.auth.models import User
from django.contrib import messages
import uuid
import datetime
# mail connector
from utils.custom_decorator import *
from django.shortcuts import render, redirect
from django.utils import timezone

from rest_framework import status
from django.db.models import Q


class PortNameSuggestion(APIView):
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    @unauthenticated_user
    def post(self, request, format=None):
        try:
            user = self.request.user
            username = user.username
            post_data = self.request.data
            port_name = post_data['port_name']
            ports = TblPorts.objects.filter(
                Q(port_name__startswith=port_name) | Q(country_name__startswith=port_name)).order_by('country_name')
            ports = TblPortsSerializer(ports, many=True)
            if ports.data:
                return Response({'is_authenticated': user.is_authenticated, 'status': True, 'message':'success', 'ports': ports.data})
            else:
                return Response({'is_authenticated': user.is_authenticated, 'status': True, 'message':'No records found', 'ports': []})
        except:
            return Response({'is_authenticated': user.is_authenticated, 'status': False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
