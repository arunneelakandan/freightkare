import datetime

def str_to_date(date_str, format):
    '''
    Eg: 
        str_to_date('2022-01-01 12:12:12', '%Y-%m-%d %H:%M:%S') => Datetime obj, 
        str_to_date('2022-01-01', '%Y-%m-%d') => Datetime obj
    '''
    return datetime.datetime.strptime(date_str, format) if  date_str !='' else datetime.datetime(1900,1,1)

def date_to_str(date, format):
    return date.strftime(format)

def str_to_int(str):
    return int(str) if (str!="" and str) else str

def int_to_str(int):
    return str(int)