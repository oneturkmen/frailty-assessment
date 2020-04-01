#!/usr/bin/python
import psycopg2
from config import config

import numpy as np
import pandas as pd

"""
1. Make sure you first clean up the volume, i.e.:

```bash
docker-compose -f docker-compose.yml down
docker volume rm frailty-platform_db-data 
docker-compose -f docker-compose.yml up --build
```

2. Run this command:

```bash
python3 load_db.py
```

3. Verify that the tables are populated:

```bash
docker exec -it <db_container_name> psql -U unicorn rainbow
```

And run the following sql command:

```sql
SELECT *, COUNT(*) FROM user_phenotype LIMIT 5; 
```
"""

is_user_ok = 'False'


def exec_query(query):
    """ Connect to the PostgreSQL database server """
    conn = None
    data = []
    try:
        # read connection parameters
        params = config()

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)

        # create a cursor
        cur = conn.cursor()

        # query data
        # sql_command = "SELECT (created_at, wght, hr, diastolic, systolic, steps, calories) FROM user_phenotype WHERE is_user_ok=%s"
        cur.execute(query)
        data = cur.fetchall()

        # close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print("ERROR: ", error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')
            return data


def analyze(data):
    processed_data = []
    for row in data:
        for d in row:
            d = d.replace('(', '')
            d = d.replace(')', '')
            d = d.split(',')
            processed_data.append([
                int(d[0]),
                float(d[1]),
                float(d[2]),
                float(d[3]),
                float(d[4]),
                float(d[5]),
            ])
    return processed_data


def monthly_analysis(endDate):
    # generate frail score over last months data
    week = 86400*7
    first_week = weekly_analysis(endDate)
    second_week = weekly_analysis(endDate - week)
    third_week = weekly_analysis(endDate - week*2)
    fourth_week = weekly_analysis(endDate - week*3)
    frail_score = 0
    monthly_dict = {}
    if first_week['hr']+second_week['hr']+third_week['hr']+fourth_week['hr'] >= 2:
        frail_score += 1
        monthly_dict['hr'] = 1
    else:
        monthly_dict['hr'] = 0

    if first_week['bp']+second_week['bp']+third_week['bp']+fourth_week['bp'] >= 2:
        frail_score += 1
        monthly_dict['bp'] = 1
    else:
        monthly_dict['bp'] = 0

    if first_week['steps']+second_week['steps']+third_week['steps']+fourth_week['steps'] >= 2:
        frail_score += 1
        monthly_dict['steps'] = 1
    else:
        monthly_dict['steps'] = 0

    if first_week['calories']+second_week['calories']+third_week['calories']+fourth_week['calories'] >= 2:
        frail_score += 1
        monthly_dict['calories'] = 1
    else:
        monthly_dict['calories'] = 0

    if first_week['weight']+second_week['weight']+third_week['weight']+fourth_week['weight'] >= 2:
        frail_score += 1
        monthly_dict['weight'] = 1
    else:
        monthly_dict['weight'] = 0

    monthly_dict['frailty_score'] = frail_score
    return monthly_dict


def weekly_analysis(endDate):
    # generate frail score over last weeks data
    startDate = endDate - (86400*7)
    sql_command = ("SELECT (created_at, hr, diastolic, systolic, steps, calories) FROM user_phenotype WHERE is_user_ok={0}"
                   " and created_at>={1} and created_at<{2}").format(is_user_ok, startDate, endDate)

    data = exec_query(sql_command)
    week = analyze(data)
    weight_score = weight_analysis(endDate)

    frail_dict = {
        'hr': 0,
        'bp': 0,
        'steps': 0,
        'calories': 0,
    }
    for day in week:
        if day[1] < 60 or day[1] > 99:  # high and low hr
            frail_dict['hr'] += 1

        if day[2] > 80 and day[3] > 130:  # high bp
            frail_dict['bp'] += 1

        if day[2] < 70 and day[3] < 90:  # low bp
            frail_dict['bp'] += 1

        if day[4] < 4:
            frail_dict['steps'] += 1

        if day[5] < 0.270:
            frail_dict['calories'] += 1

    frail_dict['weight'] = weight_score
    
    frailty_score = 0
    for f in frail_dict.keys():
        if frail_dict[f] > 3:
            frail_dict[f] = 1
            frailty_score += 1
        else:
            frail_dict[f] = 0

    frail_dict['frailty_score'] = frailty_score

    return frail_dict


def weight_analysis(endDate):
    sql_command = ("SELECT (created_at, wght) FROM user_phenotype WHERE is_user_ok={0}"
                   " and created_at<{1}").format(is_user_ok, endDate)

    data = exec_query(sql_command)

    processed_data = []
    for row in data:
        for d in row:
            d = d.replace('(', '')
            d = d.replace(')', '')
            d = d.split(',')
            processed_data.append([int(d[0]), float(d[1])])
    change = (
        processed_data[0][1] - processed_data[len(processed_data)-1][1])/processed_data[0][1]

    if change >= 0.025:
        return 1
    else:
        return 0


# if __name__ == '__main__':

#     monthly_analysis(1588899601)
