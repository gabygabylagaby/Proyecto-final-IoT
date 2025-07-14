import mqtt from "mqtt";

export type OnMessageCallback = (ip: string, topic: string, data: any) => void;

/**
 * connectMultipleMqtt
 *
 * Función que conecta a múltiples brokers MQTT, suscribe a múltiples topics,
 * y ejecuta un callback cada vez que recibe un mensaje.
 *
 * Params:
 * - brokerUrls: string[] → Lista de URLs de brokers.
 * - topics: string[] → Lista de topics a suscribirse.
 * - onMessageCallback: (ip: string, topic: string, data: any) → Callback ejecutado por mensaje recibido.
 *
 * Returns:
 * - mqtt.MqttClient[] → Lista de clientes MQTT activos.
 */
export const connectMultipleMqtt = (
  brokerUrls: string[],
  topics: string[],
  onMessageCallback: OnMessageCallback
): mqtt.MqttClient[] => {
  const clients: mqtt.MqttClient[] = brokerUrls.map((url) => {
    const client = mqtt.connect(url);

    client.on("connect", () => {
      console.log(`Conectado a ${url}`);
      topics.forEach((topic) => {
        client.subscribe(topic, (err) => {
          if (err)
            console.error(`Error al suscribirse a ${topic} en ${url}:`, err);
        });
      });
    });

    client.on("message", (topic, message) => {
      const data = JSON.parse(message.toString());
      const ip = url.split("//")[1].split(":")[0];
      onMessageCallback(ip, topic, data);
    });

    client.on("error", (err) => {
      console.error(`Error MQTT en ${url}:`, err);
    });

    return client;
  });

  return clients;
};
