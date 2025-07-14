import { Box, LinearProgress, Typography } from "@mui/material";

interface HumidityGaugeProps {
  value: number;
}

/**
 * HumidityGauge
 *
 * Componente que muestra una barra horizontal tipo medidor de progreso,
 * indicando el nivel actual de humedad en porcentaje.
 *
 * Props:
 * - value: number → Valor actual de humedad (%).
 */
const HumidityGauge: React.FC<HumidityGaugeProps> = ({ value }) => {
  return (
    <Box>
      <Typography variant="h6" align="center">
        💧 {value}% Humedad
      </Typography>
      <LinearProgress
        variant="determinate"
        value={Math.min(value, 100)}
        sx={{ height: 20, borderRadius: 5, mt: 2 }}
      />
    </Box>
  );
};

export default HumidityGauge;
