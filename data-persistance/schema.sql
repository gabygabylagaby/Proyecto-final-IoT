CREATE TABLE IF NOT EXISTS sensors (
  id          UUID PRIMARY KEY,
  ip_address  inet,
  location    text,
  description text,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sensor_readings (
  id            bigserial PRIMARY KEY,
  sensor_ip     inet          NOT NULL,
  topic         text          NOT NULL,
  payload       jsonb         NOT NULL,
  value_numeric double precision,
  unit          text,
  recorded_at   timestamptz   NOT NULL,
  ingested_at   timestamptz   DEFAULT now()
);

CREATE INDEX ON sensor_readings (sensor_ip, recorded_at DESC);
CREATE INDEX ON sensor_readings USING GIN (payload);
