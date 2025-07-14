import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import HistoryTable from "./components/HistoryTable";
import { connectMultipleMqtt } from "./services/mqttService";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import TemperatureThermometer from "./components/TemperatureThermometer";
import HumidityGauge from "./components/HumidityCage";
import ChartComponent from "./components/ChartComponent";
import TapeMeasure from "./components/TapeMeasure";
import SmokeAlert from "./components/SmokeAlert";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

/**
 * App
 *
 * Componente principal de la aplicación IoT.
 * Conecta a múltiples brokers MQTT, recibe datos de sensores de distancia, temperatura,
 * humedad y humo, y los visualiza en tiempo real.
 *
 * - Muestra tarjetas con valores actuales.
 * - Usa Tabs para cambiar entre sensores.
 * - Muestra visual dinámico (termómetro, cinta métrica, alerta humo, etc).
 * - Muestra gráfico y tabla histórica.
 */
const App = () => {
  const [distances, setDistances] = useState<number[]>([]);
  const [distances2, setDistances2] = useState<number[]>([]);
  const [temperatures, setTemperatures] = useState<number[]>([]);
  const [humidities, setHumidities] = useState<number[]>([]);
  const [smokes, setSmokes] = useState<number[]>([]);
  const [currentDistance, setCurrentDistance] = useState<number>(0);
  const [currentDistance2, setCurrentDistance2] = useState<number>(0);
  const [currentTemperature, setCurrentTemperature] = useState<number>(0);
  const [currentHumidity, setCurrentHumidity] = useState<number>(0);
  const [currentSmoke, setCurrentSmoke] = useState<number>(0);
  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    const brokers = ["ws://172.20.25.151:9001"];
    const topics = [
      "sensores/distancia",
      "sensores/distancia2",
      "sensores/temperatura",
      "sensores/humedad",
      "sensores/humo",
    ];

    const clients = connectMultipleMqtt(brokers, topics, (_ip, topic, data) => {
      if (topic === "sensores/distancia") {
        const distance = data.distancia;
        setCurrentDistance(distance);
        setDistances((prev) => [...prev.slice(-19), distance]);
      }
      if (topic === "sensores/distancia2") {
        const distance = data["distancia2"];
        setCurrentDistance2(distance);
        setDistances2((prev) => [...prev.slice(-19), distance]);
      }
      if (topic === "sensores/temperatura") {
        const temperature = data.temperatura;
        setCurrentTemperature(temperature);
        setTemperatures((prev) => [...prev.slice(-19), temperature]);
      }
      if (topic === "sensores/humedad") {
        const humidity = data.humedad;
        setCurrentHumidity(humidity);
        setHumidities((prev) => [...prev.slice(-19), humidity]);
      }
      if (topic === "sensores/humo") {
        const smoke = data.humo;
        setCurrentSmoke(smoke);
        setSmokes((prev) => [...prev.slice(-19), smoke]);
      }
    });

    return () => clients.forEach((c) => c.end());
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const getCurrentData = () => {
    if (tab === 0) return distances;
    if (tab === 1) return distances2;
    if (tab === 2) return temperatures;
    if (tab === 3) return humidities;
    if (tab === 4) return smokes;
    return [];
  };

  const getLabel = () => {
    if (tab === 0) return "Distancia (cm)";
    if (tab === 1) return "Distancia 2 (cm)";
    if (tab === 2) return "Temperatura (°C)";
    if (tab === 3) return "Humedad (%)";
    if (tab === 4) return "Humo (ppm)";
    return "";
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <h2>Grupo 2</h2>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={6} display="flex">
            <Card
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  📏 Distancia
                </Typography>
                <Typography variant="h5" align="center" color="primary">
                  {currentDistance} cm
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={4} xs={6} display="flex">
            <Card
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  📏 Distancia 2
                </Typography>
                <Typography variant="h5" align="center" color="primary">
                  {currentDistance2} cm
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={4} xs={6} display="flex">
            <Card
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  🌡️ Temperatura
                </Typography>
                <Typography variant="h5" align="center" color="error">
                  {currentTemperature} °C
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={6} xs={6} display="flex">
            <Card
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  💧 Humedad
                </Typography>
                <Typography variant="h5" align="center" color="info.main">
                  {currentHumidity} %
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={6} xs={12} display="flex">
            <Card
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  🔥 Humo
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color={currentSmoke > 500 ? "error" : "success.main"}
                >
                  {currentSmoke} ppm
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          variant="scrollable"
          scrollButtons="auto"
          aria-label="tabs de sensores"
        >
          <Tab label="Distancia" />
          <Tab label="Distancia2" />
          <Tab label="Temperatura" />
          <Tab label="Humedad" />
          <Tab label="Humo" />
        </Tabs>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Visual Actual - {getLabel()}
              </Typography>
              {tab === 0 || tab === 1 ? (
                <TapeMeasure value={currentDistance} />
              ) : tab === 2 ? (
                <TemperatureThermometer value={currentTemperature} />
              ) : tab === 3 ? (
                <HumidityGauge value={currentHumidity} />
              ) : (
                <SmokeAlert value={currentSmoke} />
              )}
            </CardContent>
          </Card>

          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Gráfico Histórico - {getLabel()}
              </Typography>
              <ChartComponent dataPoints={getCurrentData()} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tabla Histórica - {getLabel()}
              </Typography>
              <HistoryTable history={getCurrentData()} label={getLabel()} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
