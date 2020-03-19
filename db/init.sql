
GRANT ALL PRIVILEGES ON DATABASE rainbow to unicorn; -- DB configured in docker-compose.yml

-------------------------------------- TABLES ---------------------------------------------
SET timezone = 'America/Edmonton';

CREATE TABLE measurements (
	id      SERIAL    PRIMARY KEY,
	date    TIMESTAMP NOT NULL,
	type    SMALLINT  NOT NULL,
	values  REAL[]    NOT NULL
);

CREATE TABLE slpSummary (
	id      SERIAL    PRIMARY KEY,
	date    TIMESTAMP NOT NULL,
	lightsleepduration BIGINT NOT NULL,
	deepsleepduration BIGINT NOT NULL,
	durationtosleep BIGINT NOT NULL,
	remsleepduration BIGINT NOT NULL,
	hr_average BIGINT NOT NULL,
	hr_max BIGINT NOT NULL,
	rr_average BIGINT NOT NULL,
	rr_min BIGINT NOT NULL,
	rr_max BIGINT NOT NULL,
	breathing_disturbances_intensity BIGINT NOT NULL,
	snoring BIGINT NOT NULL,
	snoringepisodecount BIGINT NOT NULL
);

CREATE TABLE workouts (
	id      SERIAL    PRIMARY KEY,
	date    TIMESTAMP NOT NULL,
	calories DECIMAL(5) NOT NULL,
	effduration BIGINT NOT NULL,
	intensity BIGINT NOT NULL,
	hr_average BIGINT NOT NULL,
	hr_min BIGINT NOT NULL,
	hr_max BIGINT NOT NULL,
	hr_zone_0 BIGINT NOT NULL,
	hr_zone_1 BIGINT NOT NULL,
	hr_zone_2 BIGINT NOT NULL,
	hr_zone_3 BIGINT NOT NULL
);

CREATE TABLE activity (
	id      SERIAL    PRIMARY KEY,
	date    TIMESTAMP NOT NULL,
	steps BIGINT NOT NULL,
	distance DECIMAL(5) NOT NULL,
	elevation DECIMAL(5) NOT NULL,
	soft BIGINT NOT NULL,
	moderate BIGINT NOT NULL,
	intense DECIMAL(3) NOT NULL,
	active BIGINT NOT NULL,
	calories DECIMAL(5) NOT NULL,
	totalcalories DECIMAL(5) NOT NULL,
	hr_average DECIMAL(5) NOT NULL,
	hr_min BIGINT NOT NULL,
	hr_max BIGINT NOT NULL,
	hr_zone_0 BIGINT NOT NULL,
	hr_zone_1 BIGINT NOT NULL,
	hr_zone_2 BIGINT NOT NULL,
	hr_zone_3 BIGINT NOT NULL
);

CREATE TABLE sleep (
	id      SERIAL    PRIMARY KEY,
	startdate BIGINT NOT NULL,
	state INT NOT NULL,
	enddate BIGINT NOT NULL,
	hr BIGINT[2][2] NOT NULL,
	rr BIGINT[2][2] NOT NULL,
	snoring BIGINT[2][2] NOT NULL
);

CREATE TABLE intraDayactivity (
	id      SERIAL    PRIMARY KEY,
	epochTime TIMESTAMP NOT NULL,
	steps INT NULL,
	duration BIGINT NULL,
	elevation BIGINT NULL,
	distance BIGINT NULL,
	calories DECIMAL(5) NULL,
	heartRate INT NULL
);

