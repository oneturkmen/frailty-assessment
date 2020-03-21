GRANT ALL PRIVILEGES ON DATABASE rainbow to unicorn; -- DB configured in docker-compose.yml

SET timezone = 'America/Edmonton';

----------------------------------- DATA USE ----------------------------------------------

-- average heart rate

-- average heart rate
-- heart rate normal = 60 - 99
-- heart rate lower or higher = +1 on scale

-- calories burnt per week < 383 Kcal for men = +1 on scale
-- calories burnt per week < 270 Kcal for women = +1 on scale

-- weight loss 4.5kg per year (2.25 every 6 months)

-- normal range 120/80
-- systolic bp > 135 = +1
-- diastolic bp < 74 = +1

-- steps walking time N/1000
-- 12.2 (+-2) = normal
-- 6.7 (+-2) = pre
-- 4.3 (+-2) = frail


-------------------------------------------- TABLES ---------------------------------------

----------------------------- Tables for fake (yet realistic) data ------------------------
-- Everything is per day:
-- time,weight,hr,bp,steps,calories
CREATE TABLE user_phenotype (
  id SERIAL PRIMARY KEY,
  created_at BIGINT NOT NULL,
  wght REAL NOT NULL,
  hr REAL NOT NULL,
  diastolic REAL NOT NULL,
  systolic REAL NOT NULL,
  steps REAL NOT NULL,  -- multiple by 1000
  calories REAL NOT NULL,
  is_user_ok BOOLEAN NOT NULL -- FIXME: Used for frail/non-frail data just for demoing!
);


-- CREATE TABLE user_phenotype (
--   id SERIAL PRIMARY KEY,
--   created_at BIGINT NOT NULL,
--   wght DECIMAL(2) NOT NULL,
--   hr DECIMAL(2) NOT NULL,
--   diastolic DECIMAL(4) NOT NULL,
--   systolic DECIMAL(4) NOT NULL,
--   steps DECIMAL(3) NOT NULL,  -- multiple by 1000
--   calories DECIMAL(3) NOT NULL,
--   is_user_ok BOOLEAN NOT NULL -- FIXME: Used for frail/non-frail data just for demoing!
-- );

-------------------------------------- Tables for Withings --------------------------------

-- CREATE TABLE measurements (
-- 	id      SERIAL    PRIMARY KEY,
-- 	date    TIMESTAMP NOT NULL,
-- 	type    SMALLINT  NOT NULL,
-- 	values  REAL[]    NOT NULL
-- );

-- CREATE TABLE slpSummary (
-- 	id      SERIAL    PRIMARY KEY,
-- 	date    TIMESTAMP NOT NULL,
-- 	lightsleepduration BIGINT NOT NULL,
-- 	deepsleepduration BIGINT NOT NULL,
-- 	durationtosleep BIGINT NOT NULL,
-- 	remsleepduration BIGINT NOT NULL,
-- 	hr_average BIGINT NOT NULL,
-- 	hr_max BIGINT NOT NULL,
-- 	rr_average BIGINT NOT NULL,
-- 	rr_min BIGINT NOT NULL,
-- 	rr_max BIGINT NOT NULL,
-- 	breathing_disturbances_intensity BIGINT NOT NULL,
-- 	snoring BIGINT NOT NULL,
-- 	snoringepisodecount BIGINT NOT NULL
-- );

-- CREATE TABLE workouts (
-- 	id      SERIAL    PRIMARY KEY,
-- 	date    TIMESTAMP NOT NULL,
-- 	calories DECIMAL(5) NOT NULL,
-- 	effduration BIGINT NOT NULL,
-- 	intensity BIGINT NOT NULL,
-- 	hr_average BIGINT NOT NULL,
-- 	hr_min BIGINT NOT NULL,
-- 	hr_max BIGINT NOT NULL,
-- 	hr_zone_0 BIGINT NOT NULL,
-- 	hr_zone_1 BIGINT NOT NULL,
-- 	hr_zone_2 BIGINT NOT NULL,
-- 	hr_zone_3 BIGINT NOT NULL
-- );

-- CREATE TABLE activity (
-- 	id      SERIAL    PRIMARY KEY,
-- 	date    TIMESTAMP NOT NULL,
-- 	steps BIGINT NOT NULL,
-- 	distance DECIMAL(5) NOT NULL,
-- 	elevation DECIMAL(5) NOT NULL,
-- 	soft BIGINT NOT NULL,
-- 	moderate BIGINT NOT NULL,
-- 	intense DECIMAL(3) NOT NULL,
-- 	active BIGINT NOT NULL,
-- 	calories DECIMAL(5) NOT NULL,
-- 	totalcalories DECIMAL(5) NOT NULL,
-- 	hr_average DECIMAL(5) NOT NULL,
-- 	hr_min BIGINT NOT NULL,
-- 	hr_max BIGINT NOT NULL,
-- 	hr_zone_0 BIGINT NOT NULL,
-- 	hr_zone_1 BIGINT NOT NULL,
-- 	hr_zone_2 BIGINT NOT NULL,
-- 	hr_zone_3 BIGINT NOT NULL
-- );

-- CREATE TABLE sleep (
-- 	id      SERIAL    PRIMARY KEY,
-- 	startdate BIGINT NOT NULL,
-- 	state INT NOT NULL,
-- 	enddate BIGINT NOT NULL,
-- 	hr BIGINT[2][2] NOT NULL,
-- 	rr BIGINT[2][2] NOT NULL,
-- 	snoring BIGINT[2][2] NOT NULL
-- );

-- CREATE TABLE intraDayactivity (
-- 	id      SERIAL    PRIMARY KEY,
-- 	epochTime TIMESTAMP NOT NULL,
-- 	steps INT NULL,
-- 	duration BIGINT NULL,
-- 	elevation BIGINT NULL,
-- 	distance BIGINT NULL,
-- 	calories DECIMAL(5) NULL,
-- 	heartRate INT NULL
-- );

