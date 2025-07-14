import { Box, Typography } from "@mui/material";

interface TapeMeasureProps {
  value: number;
}

/**
 * TapeMeasure
 *
 * Componente visual que simula una cinta métrica.
 * Muestra un rango centrado alrededor del valor actual con marcas y etiquetas dinámicas,
 * y un marcador deslizante que indica la posición actual.
 *
 * Props:
 * - value: number → Valor actual de distancia (cm).
 */
const TapeMeasure: React.FC<TapeMeasureProps> = ({ value }) => {
  const windowSize = 4; 
  const halfWindow = Math.floor(windowSize / 2);
  const minMark = Math.max(0, value - halfWindow);
  const maxMark = value + halfWindow;

  const marks: number[] = [];
  for (let i = minMark; i <= maxMark; i++) {
    marks.push(i);
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const markerOffset =
    marks.length > 1 ? ((value - minMark) / (maxMark - minMark)) * 100 : 0;

  return (
    <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        📏 {formatNumber(value)} cm
      </Typography>

      <Box
        sx={{
          position: "relative",
          height: 70,
          backgroundColor: "#f0f0f0",
          borderRadius: 4,
        }}
      >
        {marks.map((_mark, index) => (
          <Box
            key={`mark-${index}`}
            sx={{
              position: "absolute",
              left: `${(index / (marks.length - 1)) * 100}%`,
              bottom: 20,
              width: 2,
              height: index % 2 === 0 ? "60%" : "40%",
              backgroundColor: "grey.700",
              transform: "translateX(-50%)",
            }}
          />
        ))}

        {marks.map((mark, index) => (
          <Typography
            key={`label-${index}`}
            variant="caption"
            sx={{
              position: "absolute",
              left: `${(index / (marks.length - 1)) * 100}%`,
              bottom: 0,
              transform: "translateX(-50%)",
              color: "grey.700",
            }}
          >
            {formatNumber(mark)}
          </Typography>
        ))}

        <Box
          sx={{
            position: "absolute",
            left: `${markerOffset}%`,
            top: 0,
            transform: "translateX(-50%)",
            color: "red",
            fontSize: "1.5rem",
          }}
        >
          ▲
        </Box>
      </Box>
    </Box>
  );
};

export default TapeMeasure;
