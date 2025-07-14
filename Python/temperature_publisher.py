import time
import json
import random
import paho.mqtt.client as mqtt

broker_address = "172.20.25.151"
broker_port = 1883
topic = "sensores/temperatura"

client = mqtt.Client()
client.connect(broker_address, broker_port, 60)

try:
    while True:
        temperatura = round(random.uniform(20.0, 35.0), 2)
        mensaje = {
            "temperatura": temperatura
        }

        print("Publicando:", mensaje)
        client.publish(topic, json.dumps(mensaje))

        time.sleep(2)

except KeyboardInterrupt:
    print("Simulación terminada por el usuario.")
