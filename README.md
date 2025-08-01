# Proyecto IoT: Sistema de Monitoreo en Tiempo Real con MQTT

**Integrantes del grupo:**

* Samuel Escalera Herrera
* Diego Figueroa Sevillano
* Gabriela García Villalobos
* Leonardo Herrera Rosales
* Fabián Romero Claros
* Santiago Caballero Manzaneda

## Descripción General del Proyecto

Este proyecto tiene como objetivo desarrollar un sistema de monitoreo en tiempo real basado en IoT, utilizando sensores conectados a una placa Arduino, comunicación mediante el protocolo MQTT, procesamiento intermedio en Python y una visualización de datos en aplicaciones web. Los datos recolectados incluyen parámetros como temperatura, humedad, y gas.

## Estructura del Proyecto

```
Proyecto-IoT-MQTT/
│
├── Arduino/              
│   └── sensores.ino
│
├── Python/               
│   └── python.py
│
├── data-persistance/               
│   └── db.py
│   └── mqtt_ingestor.py
│   └── scheme.sql
│
├── front-end/                  
│   ├── index.html
│   ├── src/
│   │   ├── App.tsx
│   └── style.css
│
└── .gitignore             
└── README.md
```

## Instalación y Configuración del Broker MQTT (Mosquitto)

### Requisitos Previos:

* Python 3.x
* Mosquitto MQTT Broker
* Arduino IDE
* Navegador web
* Node

### En Linux:

```bash
sudo apt update
sudo apt install mosquitto mosquitto-clients
sudo systemctl start mosquitto
sudo systemctl enable mosquitto
```

### En Windows:

1. Descargar desde: [https://mosquitto.org/download/](https://mosquitto.org/download/)
2. Instalar y habilitar servicio.
3. Ejecutar Mosquitto en background con:

```bash
mosquitto -v
```

## Explicación de los Componentes del Sistema

| Componente        | Función                                                                     |
| ----------------- | --------------------------------------------------------------------------- |
| **MQTT Clients**  | Publican datos (sensores) desde Arduino usando comunicación serial + Python |
| **Broker MQTT**   | Mosquitto actúa como servidor central para gestionar los mensajes           |
| **Web**           | Se suscriben a los temas MQTT para ver datos en tiempo real, React + TS     |
| **Python Script** | Lee datos del puerto serial, los transforma y publica vía MQTT              |

## Arquitectura
![arquitectura](image.png)

## Resultados Obtenidos

* Se logró conectar los sensores al Arduino y generar datos (simulados o reales).
* Comunicación exitosa vía puerto serial con Python.
* Publicación correcta de datos usando MQTT.
* Flujo de datos en tiempo real sin pérdidas evidentes.

## Screenshots
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![alt text](image-5.png)

### Responsive
![alt text](image-6.png)
![alt text](image-7.png)

## Posibles Mejoras

* Integrar un sistema de alertas por umbral.
* Controlar actuadores desde la interfaz.

## Capturas y Evidencias de Pruebas


<img width="1200" height="1600" alt="image" src="https://github.com/user-attachments/assets/b4cb13a7-dabb-4594-a646-9d5e844d9aed" />

![WhatsApp Image 2025-07-14 at 11 46 33 AM](https://github.com/user-attachments/assets/d67879ff-fd2b-4387-a957-016b8ed12bbb)
