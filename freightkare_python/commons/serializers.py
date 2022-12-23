from rest_framework import serializers
from .models import *

class TblPortsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblPorts
        fields = '__all__'

class TblRateSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblRateSheet
        fields = '__all__'