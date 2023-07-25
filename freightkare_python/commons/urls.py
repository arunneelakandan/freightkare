from django.urls import path
from .views import *

urlpatterns = [
    path('port_name_suggestion', PortNameSuggestion.as_view()),
    path('get_quotation_rate', GetQuotationRate.as_view()),
]
