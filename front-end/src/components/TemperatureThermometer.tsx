import { Box, Typography } from "@mui/material";

interface TemperatureThermometerProps {
  value: number;
}

/**
 * TemperatureThermometer
 *
 * Componente visual que muestra un termómetro vertical,
 * llenándose proporcionalmente al valor actual.
 *
 * Props:
 * - value: number → Valor actual de temperatura (°C).
 */
const TemperatureThermometer: React.FC<TemperatureThermometerProps> = ({
  value,
}) => {
  const percentage = Math.min(value / 100, 1) * 100;

  return (
    <Box>
      <Typography variant="h6" align="center">
        🌡️ {value} °C
      </Typography>
      <Box
        sx={{
          height: 200,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Box
          sx={{
            width: 30,
            height: "100%",
            bgcolor: "#e0e0e0",
            borderRadius: 5,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: `${percentage}%`,
              bgcolor: "error.main",
              borderRadius: 5,
              transition: "height 0.3s ease",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TemperatureThermometer;
