CREATE SCHEMA frailty_schema;

CREATE ROLE 'postgres' WITH CREATEROLE;

ALTER USER 'unicorn' ENCRYPTED PASSWORD '$POSTGRES_PASSWORD';
GRANT ALL PRIVILIGES ON frailty_schema to 'unicorn';

-- CREATE TABLE frailty_schema.heart_rate (
--   ...
-- );
--
--
