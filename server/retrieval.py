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

"""
Get heart rate for the past week (daily)
"""
def weekly_hr(endDate):
    # Get data for last week (from `endDate`)
    startDate = endDate - (86400*7)
    q = ("SELECT created_at, hr FROM user_phenotype WHERE is_user_ok={0}"
        " and created_at>={1} and created_at<{2}").format(is_user_ok, startDate, endDate)
    results = exec_query(q)

    # Format
    results = [{'ts': ts, 'val': val} for ts, val in results]

    # Return
    return results

"""
Get heart rate for the past month (daily)
"""
def monthly_hr(endDate):
    startDate = endDate - (86400*30)
    q = ("SELECT created_at, hr FROM user_phenotype WHERE is_user_ok={0}"
        " and created_at>={1} and created_at<{2}").format(is_user_ok, startDate, endDate)
    results = exec_query(q)

    # Format
    results = [{'ts': ts, 'val': val} for ts, val in results]

    # Return
    return results

"""
Get BP for the past week (daily)
"""
def weekly_bp(endDate):
    # Get data for last week (from `endDate`)
    startDate = endDate - (86400*7)
    q = ("SELECT created_at, diastolic, systolic FROM user_phenotype WHERE is_user_ok={0}"
        " and created_at>={1} and created_at<{2}").format(is_user_ok, startDate, endDate)
    results = exec_query(q)

    # Format
    results = [{'ts': ts, 'dias': d, 'syst': s} for ts, d, s in results]

    # Return
    return results

"""
Get BP for the past month (daily)
"""
def monthly_bp(endDate):
    startDate = endDate - (86400*30)
    q = ("SELECT created_at, diastolic, systolic FROM user_phenotype WHERE is_user_ok={0}"
        " and created_at>={1} and created_at<{2}").format(is_user_ok, startDate, endDate)
    results = exec_query(q)

    # Format
    results = [{'ts': ts, 'dias': d, 'syst': s} for ts, d, s in results]

    # Return
    return results
