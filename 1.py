import serial
import time
import json
import paho.mqtt.client as mqtt


puerto_serial = serial.Serial(port='COM5', baudrate=9600, timeout=1)

broker_address = "localhost"
broker_port = 1883
topic = "sensores/distancia"

client = mqtt.Client()
client.connect(broker_address, broker_port, 60)

time.sleep(2) 

try:
    while True:
        if puerto_serial.in_waiting:
            linea = puerto_serial.readline().decode('utf-8').strip()
            try:
                data = json.loads(linea)
                print("Enviando al broker MQTT:", data)
                client.publish(topic, json.dumps(data))
            except json.JSONDecodeError:
                print("Error al decodificar JSON:", linea)

except KeyboardInterrupt:
    print("Programa terminado por el usuario")

finally:
    puerto_serial.close()