import json, time, argparse
from datetime import datetime, timezone
from db import insert_reading
import paho.mqtt.client as mqtt


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--broker", default="localhost")
    ap.add_argument("--topics", default="sensores/#",
                    help="Lista separada por comas")
    args = ap.parse_args()

    client = mqtt.Client()
    client.connect(args.broker)

    for t in args.topics.split(","):
        client.subscribe(t)

    def on_message(_, __, msg):
        try:
            payload = json.loads(msg.payload.decode())
        except json.JSONDecodeError:
            print("Mensaje no-JSON, descartado:", msg.topic)
            return

        sensor_ip = msg.properties.UserProperty[0][1] if msg.properties else "0.0.0.0"
        ts = payload.get("timestamp")
        recorded_at = (
            datetime.fromtimestamp(ts / 1000, tz=timezone.utc) if ts else
            datetime.now(timezone.utc)
        )

        insert_reading(sensor_ip, msg.topic, payload, recorded_at)

    client.on_message = on_message
    client.loop_forever()

if __name__ == "__main__":
    main()
