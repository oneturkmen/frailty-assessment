# Frailty assessment platform

### Build dependencies

- Docker
- Docker Compose
- Python3

### Usage

Docker and Docker Compose is needed to run the project.

After you install the two, you have to populate the database with synthetic data. To do so,
run the following command (make sure you have [psycopg2 installed](https://pynative.com/python-postgresql-tutorial/):

```bash
# Run the database
docker-compose up --build database

# Store synthetic data
python3 load_db.py

# Shut down the database
docker-compose down
```

Now you can run the project and try it out. To start all services, run the following 
command:

```
docker-compose up
```

Open your browser and head to `http://localhost:3000`.

### Directory structure

- *db* - contains database-related files such as definition of SQL tables and synthetic dataset in the form of csv.
- *docs* - contains project documents such as system architecture design.
- *server* - back-end server built on top of Flask.
- *ui* - front-end server built on top of React and Material UI.
- *worker* - Node.js-based server that queries Withings API and stores the data, in a batch manner.
