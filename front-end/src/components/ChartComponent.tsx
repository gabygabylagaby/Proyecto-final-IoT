import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface ChartComponentProps {
  dataPoints: number[];
}

/**
 * ChartComponent
 *
 * Componente que renderiza un gráfico de línea usando react-chartjs-2,
 * mostrando los valores históricos del sensor seleccionado.
 *
 * Props:
 * - dataPoints: number[] → Lista de valores numéricos históricos.
 */
const ChartComponent: React.FC<ChartComponentProps> = ({ dataPoints }) => {
  const data = {
    labels: dataPoints.map((_, idx) => idx),
    datasets: [
      {
        label: "Valor",
        data: dataPoints,
        fill: false,
        borderColor: "rgb(27, 124, 124)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        scales: {
          y: {
            ticks: {
              stepSize: 1,
              callback: (value: string | number) =>
                typeof value === "number" ? Math.round(value) : 0,
            },
          },
        },
      }}
    />
  );
};

export default ChartComponent;
