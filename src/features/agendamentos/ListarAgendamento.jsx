import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { getAgendamentos } from '../../services/agendamentoService';

export default function ListarAgendamento() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    async function carregar() {
      const lista = await getAgendamentos();
      setAgendamentos(lista);
    }
    carregar();
  }, []);

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Agendamentos Realizados
          </Typography>

          {agendamentos.length === 0 ? (
            <Typography color="text.secondary">Nenhum agendamento encontrado.</Typography>
          ) : (
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Paciente</TableCell>
                    <TableCell>Especialidade</TableCell>
                    <TableCell>Médico</TableCell>
                    <TableCell>Convênio</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Hora</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {agendamentos.map((ag, i) => {
                    const dataObj = new Date(ag.dataHora);
                    const data = dataObj.toLocaleDateString('pt-BR');
                    const hora = dataObj.toTimeString().slice(0, 5);

                    return (
                      <TableRow key={i}>
                        <TableCell>{ag.paciente}</TableCell>
                        <TableCell>{ag.especialidadeId}</TableCell>
                        <TableCell>{ag.medico}</TableCell>
                        <TableCell>{ag.convenioId}</TableCell>
                        <TableCell>{data}</TableCell>
                        <TableCell>{hora}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
