#!/usr/bin/python
import psycopg2
from config import config

import numpy as np
import pandas as pd

"""
1. Make sure you first clean up the volume, i.e.:

```bash
docker-compose -f docker-compose.yml down
docker-compose volume rm frailty-platform_db-data 
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

def read_data():
  data = pd.read_csv('fakedata.csv')
  return data

def connect():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # read connection parameters
        params = config()

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)

        # create a cursor
        cur = conn.cursor()

        # execute a statement
        print('PostgreSQL database version:')
        cur.execute('SELECT version()')

        # insert data
        sql_command = ("INSERT INTO user_phenotype (created_at, wght, hr, "
                      "diastolic, systolic, steps, calories, is_user_ok)"
                      " VALUES (%s, %s, %s, %s, %s, %s, %s, %s)")
        data = read_data()
        for index, row in data.iterrows():
          # created_at,wght,hr,diastolic,systolic,steps,calories,is_user_ok
          print(row)
          cur.execute(sql_command,
            (int(row['created_at']), np.round(row['wght'], 2), np.round(row['hr'], 2),
            np.round(row['diastolic'], 4), np.round(row['systolic'], 4), np.round(row['steps'], 3),
            np.round(row['calories'], 3), str(int(row['is_user_ok'])))
          )

          conn.commit()

        # verify insertion
        print('\nPostgreSQL: verify inserted data')
        cur.execute('SELECT count(*) FROM user_phenotype')

        # display the PostgreSQL database server version
        db_version = cur.fetchone()
        print(db_version)

        # close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print("ERROR: ", error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')


if __name__ == '__main__':
    connect()
