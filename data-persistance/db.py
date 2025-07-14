import os
from psycopg2.pool import SimpleConnectionPool
from psycopg2.extras import Json
from dotenv import load_dotenv

load_dotenv()

POOL = SimpleConnectionPool(
    1,
    10,
    host=os.getenv("PG_HOST", "localhost"),
    dbname=os.getenv("PG_DB", "iot_db"),
    user=os.getenv("PG_USER", "iot_user"),
    password=os.getenv("PG_PASS", "iot_pass"),
)

def insert_reading(sensor_ip: str, topic: str, payload: dict, recorded_at):
    conn = POOL.getconn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO sensor_readings
                (sensor_ip, topic, payload, value_numeric, unit, recorded_at)
                VALUES (%s, %s, %s, %s, %s, %s)
                """,
                (
                    sensor_ip,
                    topic,
                    Json(payload),
                    payload.get("value") or None,
                    payload.get("unit") or None,
                    recorded_at,
                ),
            )
        conn.commit()
    finally:
        POOL.putconn(conn)
