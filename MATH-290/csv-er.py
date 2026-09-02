# I hardly know 'er!

import datetime as dt

FIRST_HW_DATE = dt.datetime(2026, 9, 9)

def date_to_str(date_obj):
    return date_obj.strftime("%B %d, %Y %I %p (MDT)")

HEADER = "CLASS, Assignment, DUE, ass. type"

def print_row(name, date_obj, type):
    print(f"MATH 290,{name},\"{date_to_str(date_obj)}\",{type}")

def get_next(date, day_of_week):
    nday = None
    if day_of_week is int:
        nday = day_of_week
    else:
        days = {"mon":0, 
                "tue":1, 
                "wed":2, 
                "thu": 3,
                "fri": 4,
                "sat": 5,
                "sun": 6
                }
        nday = days[day_of_week.lower()]
    


