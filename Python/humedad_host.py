import paho.mqtt.client as mqtt
import random
import time
import json

BROKER_IP = "172.20.25.151"
BROKER_PORT = 1883
TOPIC_HUMEDAD = "sensores/humedad"
INTERVALO_SEGUNDOS = 2

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Conectado exitosamente al broker MQTT")
    else:
        print(f"⚠️ Error al conectar: código {rc}")

client = mqtt.Client()
client.on_connect = on_connect
client.connect(BROKER_IP, BROKER_PORT, keepalive=60)

client.loop_start()

try:
    while True:
        humedad = random.randint(0, 100)
        payload = json.dumps({"humedad": humedad})
        client.publish(TOPIC_HUMEDAD, payload)
        print(f"📡 Humedad publicada: {payload} en '{TOPIC_HUMEDAD}'")
        time.sleep(INTERVALO_SEGUNDOS)
except KeyboardInterrupt:
    print("⛔ Script detenido por el usuario.")
    client.loop_stop()
    client.disconnect()
