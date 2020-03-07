GRANT ALL PRIVILEGES ON DATABASE rainbow to unicorn; -- DB configured in docker-compose.yml

-------------------------------------- TABLES ---------------------------------------------
SET timezone = 'America/Edmonton';

CREATE TABLE measurements (
  id      SERIAL    PRIMARY KEY,
  date    TIMESTAMP NOT NULL,
  type    SMALLINT  NOT NULL,
  values  REAL[]    NOT NULL
);




