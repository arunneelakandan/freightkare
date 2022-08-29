# Global Packages
import sys
import json
import socket
# Global Packages

# Django Packages
from django.conf import settings
# Django Packages

HOSTNAME = socket.gethostname()
IP_ADDRESS = socket.gethostbyname(HOSTNAME)

PROJECT_BASE_PATH = str(settings.BASE_DIR)
