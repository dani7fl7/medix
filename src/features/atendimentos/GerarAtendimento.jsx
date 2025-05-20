import React, { useEffect, useState } from 'react';
import {
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
import AdminCard from '../../components/AdminCard';

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
    <>
      <AdminCard title="Marcar Atendimento">
        <FormControl fullWidth margin="normal">
          <InputLabel>Agendamento</InputLabel>
          <Select
            value={agendamentoSelecionado}
            onChange={(e) => setAgendamentoSelecionado(e.target.value)}
            label="Agendamento"
          >
            {agendamentos.map((ag) => (
              <MenuItem key={ag.id} value={ag.id}>
                {ag.paciente} — {new Date(ag.dataHora).toLocaleString('pt-BR')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={!agendamentoSelecionado}
          onClick={handleConfirmar}
        >
          Confirmar Atendimento
        </Button>
      </AdminCard>

      <Snackbar
        open={!!mensagem}
        autoHideDuration={3000}
        onClose={() => setMensagem('')}
      >
        <Alert severity="success" onClose={() => setMensagem('')}>
          {mensagem}
        </Alert>
      </Snackbar>
    </>
  );
}
