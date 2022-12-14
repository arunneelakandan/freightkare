from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    # path('api-auth/', include('rest_framework.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('api/user_profile/', include('user_profile.urls')),
    path('api/commons/', include('commons.urls')),
]

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
