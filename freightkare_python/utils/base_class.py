import string
import re
from stdnum.exceptions import *
from stdnum.util import clean

_alphabet = '0123456789ABCDEFGH JKLMN PQRSTUVWXYZ*@#'


def snake_case(strng):
    return strng.replace(" ", "_").lower()

def remove_spl_char2(string):
    global re
    return re.sub(' +', ' ', re.sub('([^\s\w]|_)+', '', string))

def get_ISIN(value):
    try:
        if not (re.findall(r"\b([A-Z]{2})((?![A-Z]{10}\b)[A-Z0-9]{10})\b", value)):
            return []
        m = re.findall(r"\b([A-Z]{2})([A-Z0-9]{9})([0-9]{1})\b", value)
        return [listToString(n) for n in m]
    except :
        return []


def listToString(s):

    # initialize an empty string
    str1 = ""

    # traverse in the string
    for ele in s:
        str1 += ele

    # return string
    return str1

def check_isin(a):
    a = str(a)
    a=a.lower()
    if 'ooo' in a:
        a= a.replace('ooo','000')
    a=a.upper()
    
    isin_codes = ['DZ', 'AO', 'AR', 'AW', 'AU', 'AT', 'BS', 'BH', 'BB', 'BE', 'BZ', 'BM', 'BO', 'BA', 'BW', 'BR', 'VG', 'BG', 'CM', 'CA', 'KY', 'GG', 'CL', 'CN', 'CI', 'CO', 'CR', 'HR', 'CU', 'CY', 'CZ', 'DK', 'DO', 'EC', 'EG', 'SV', 'EE', 'FJ', 'FI', 'FR', 'DE', 'GH', 'GI', 'GR', 'GT', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JO', 'KZ', 'KW', 'LV', 'LB', 'LR', 'LI', 'LT', 'LU', 'MO', 'MK', 'MW', 'MY', 'MT', 'MH', 'MU', 'MX', 'MN', 'MA', 'NL', 'AN', 'NZ', 'NI', 'NG', 'NO', 'OM', 'PK', 'PA', 'PE', 'PH', 'PL', 'PT', 'QA', 'MD', 'RO', 'RU', 'SA', 'SC', 'SG', 'SK', 'SI', 'ZA', 'ES', 'LK', 'EU', 'SZ', 'SE', 'CH', 'TW', 'TH', 'TT', 'TN', 'TR', 'UA', 'AE', 'GB', 'US', 'UY', 'VE', 'VN', 'ZM', 'KE', 'BD', 'AL', 'BY', 'AZ', 'UG', 'GE', 'GM', 'PG', 'YE', 'AM', 'KG', 'TJ', 'PY', 'TZ', 'RW', 'CG', 'KH', 'WS', 'NA', 'SY', 'LS', 'JE', 'MZ', 'SL', 'TG', 'UZ', 'VC', 'LA', 'SR', 'ML', 'GN', 'MC', 'GA', 'KN', 'NP', 'LC', 'TL', 'CF', 'TD', 'AG', 'GY', 'AD', 'CG', 'CI', 'ST', 'HT', 'SB', 'NE', 'LY', 'ET', 'BN', 'BJ', 'MM', 'MP', 'MV', 'GD', 'AF', 'BF', 'SD', 'SN', 'ER', 'MG', 'AI', 'ME', 'CW', 'VU', 'VI', 'ZW', 'NC', 'CV', 'CK', 'GU', 'NR', 'BT', 'GL', 'GW', 'KR', 'KR', 'RS', 'MR', 'TC', 'SM', 'TM', 'TO', 'XS']
    
    if 'ooo' in a.lower():
        return False
    
    isin_code = a[:2]
    if isin_code not in [x for x in isin_codes]:
        return False

    # if not issuer_code_logic(a):
    #     return False
    
    if len(a) != 12 or not all(c.isalpha() for c in a[:2]) or not all(c.isalnum() for c in a[2:]):
        return False
    s = "".join(str(int(c, 36)) for c in a)
    return (sum(sum(divmod(2 * (ord(c) - 48), 10)) for c in s[-2::-2]) +
            sum(ord(c) - 48 for c in s[::-2])) % 10 == 0

def unique(list1):
    return list(dict.fromkeys(list1))

# def remove_non_ascii(text):
#     # return unidecode(unicode(text, encoding = "utf-8"))
#     ignore_chars = constants.ignore_spl_chars
#     try:
#         text = listToString(
#             list(filter(lambda x: x in (string.printable and x not in ignore_chars), text)))
#         return text
#     except:
#         return text

def cusip_validate(cusip_string):
    flag = False
    try:
        validate(cusip_string)
        flag = True
    except:
        pass
    return flag

def validate(number):
    """Check if the number provided is valid. This checks the length and
    check digit."""
    number = compact(number)
    if not all(x in _alphabet for x in number):
        raise InvalidFormat()
    if len(number) != 9:
        raise InvalidLength()
    if calc_check_digit(number[:-1]) != number[-1]:
        raise InvalidChecksum()
    return number

def compact(number):
    """Convert the number to the minimal representation. This strips the
    number of any valid separators and removes surrounding whitespace."""
    return clean(number, ' ').strip().upper()

def calc_check_digit(number):
    """Calculate the check digits for the number."""
    # convert to numeric first, then sum individual digits
    number = ''.join(
        str((1, 2)[i % 2] * _alphabet.index(n)) for i, n in enumerate(number))
    return str((10 - sum(int(n) for n in number)) % 10)

def get_CUSIP(value):
    try:
        if not (re.findall(r"\b[0-9]{3}[a-zA-Z0-9]{6}\b", value)):
            return []
        m = re.findall(r"\b[0-9]{3}[a-zA-Z0-9]{6}\b", value)
        return [listToString(n) for n in m]
    except :
        return []