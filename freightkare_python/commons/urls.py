from django.urls import path
from .views import *

urlpatterns = [
    path('port_name_suggestion', PortNameSuggestion.as_view()),
]
