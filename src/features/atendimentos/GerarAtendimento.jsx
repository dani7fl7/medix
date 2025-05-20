import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { getAgendamentos } from '../../services/agendamentoService';
import { gerarAtendimento } from '../../services/atendimentoService';

export default function GerarAtendimento() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function carregar() {
      const lista = await getAgendamentos();
      setAgendamentos(lista);
    }
    carregar();
  }, []);

  const handleConfirmar = async () => {
    await gerarAtendimento({ agendamentoId: agendamentoSelecionado });
    setMensagem('Agendamento marcado como atendido!');
    setAgendamentoSelecionado('');
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Marcar Agendamento como Atendido
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel>Agendamento</InputLabel>
            <Select
              value={agendamentoSelecionado}
              onChange={(e) => setAgendamentoSelecionado(e.target.value)}
              label="Agendamento"
            >
              {agendamentos.map((ag) => (
                <MenuItem key={ag.id} value={ag.id}>
                  {ag.paciente} - {new Date(ag.dataHora).toLocaleString('pt-BR')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            disabled={!agendamentoSelecionado}
            onClick={handleConfirmar}
          >
            Confirmar Atendimento
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={!!mensagem}
        autoHideDuration={3000}
        onClose={() => setMensagem('')}
      >
        <Alert severity="success" onClose={() => setMensagem('')}>
          {mensagem}
        </Alert>
      </Snackbar>
    </Box>
  );
}
