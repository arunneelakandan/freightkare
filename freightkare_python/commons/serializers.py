from rest_framework import serializers
from .models import *

class TblPortsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblPorts
        fields = '__all__'