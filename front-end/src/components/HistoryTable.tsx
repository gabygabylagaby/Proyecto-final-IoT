import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface HistoryTableProps {
  history: number[];
  label: string;
}

/**
 * HistoryTable
 *
 * Componente que muestra una tabla con el histórico de datos recibidos.
 *
 * Props:
 * - history: number[] → Lista de valores históricos.
 * - label: string → Etiqueta para la columna de valores.
 */
const HistoryTable: React.FC<HistoryTableProps> = ({ history, label }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>{label}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((value, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
