import { Box, Typography } from "@mui/material";

interface SmokeAlertProps {
  value: number;
}

/**
 * SmokeAlert
 *
 * Componente que muestra un cuadro de alerta para humo.
 * Cambia de color y muestra un mensaje de alerta si el valor supera 500 ppm.
 *
 * Props:
 * - value: number → Valor actual de humo (ppm).
 */
const SmokeAlert: React.FC<SmokeAlertProps> = ({ value }) => {
  const isDanger = value > 500;

  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
        p: 2,
        bgcolor: isDanger ? "error.main" : "success.main",
        color: "white",
        borderRadius: 2,
        animation: isDanger ? "flash 1s infinite alternate" : "none",
      }}
    >
      <Typography variant="h4">
        {isDanger ? "🚨 ¡ALERTA DE HUMO!" : "✅ Sin humo detectado"}
      </Typography>
      <Typography variant="h6" sx={{ mt: 1 }}>
        {value} ppm
      </Typography>
      <style>
        {`
          @keyframes flash {
            from { opacity: 1; }
            to { opacity: 0.6; }
          }
        `}
      </style>
    </Box>
  );
};

export default SmokeAlert;
