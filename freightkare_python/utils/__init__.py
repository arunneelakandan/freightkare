from .custom_decorator import *
# from .custom_db import *
# from .disable_csrf import *
# from .global_variables import *
# from .validators import *
from .data_casting import *
# from .cusip import *
# from .mongo_class import *
# from .dca_mailer import *
# from .base_class import *
# from .get_content import *
# from .generic_reader import *

__all__ = [
    "custom_decorator",
    "data_casting",
    # "custom_db", "disable_csrf", "global_variables", "validators",
    # "cusip", "mongo_class", "dca_mailer", "get_content", "base_class", "generic_reader"
]


import os


def html_to_pdf(url, dest_file):
    command = f'/usr/bin/xvfb-run /usr/bin/wkhtmltopdf {url} {dest_file}'
    os.system(command)


def get_file_extension(filepath):
    return os.path.splitext(filepath)[1].lower()


def get_date_from_sec_filename(path):
    path = r'{}'.format(path)
    temp = path.split("\\")[7]
    date = temp[0:4]+"-" + temp[4:6]+"-"+temp[6:8]
    date = datetime.datetime.strptime(date, '%Y-%m-%d')
    return date


def list_chuk(list_a, chunk_size):

    for i in range(0, len(list_a), chunk_size):
        yield list_a[i:i + chunk_size]
