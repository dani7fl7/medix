import { useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';

// Horários
import SelecionarHorario from '../features/horarios/SelecionarHorario';
import ListarHorario from '../features/horarios/ListarHorario';

// Agendamentos
import CadastrarAgendamento from '../features/agendamentos/CadastrarAgendamento';
import ListarAgendamento from '../features/agendamentos/ListarAgendamento';
import {
  listarAgendamentos,
  cadastrarAgendamento,
} from '../services/agendamentoService';

// Especialidades e Convênios (para dropdowns)
import { listarEspecialidades } from '../services/especialidadeService';
import { listarConvenios } from '../services/convenioService';

// Atendimentos
import { gerarAtendimento } from '../services/atendimentoService';

export default function Home() {
  // Dados de seleção
  const [especialidades, setEspecialidades] = useState([]);
  const [convenios, setConvenios] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState('');

  // Agendamentos
  const [agendamentos, setAgendamentos] = useState([]);

  // Carregar dados iniciais
  useEffect(() => {
    listarEspecialidades().then(setEspecialidades);
    listarConvenios().then(setConvenios);
    listarAgendamentos().then(setAgendamentos);
  }, []);

  const handleCadastrarAgendamento = async (agendamento) => {
    const novo = await cadastrarAgendamento(agendamento);
    setAgendamentos((prev) => [...prev, novo]);
    setHorarioSelecionado(''); // limpa após agendar
  };

  const handleAtender = async (id) => {
    await gerarAtendimento(id);
    setAgendamentos((prev) =>
      prev.map((ag) => (ag.id === id ? { ...ag, atendido: true } : ag))
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Medix - Agendamento de Consultas
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5">Buscar Horários</Typography>
      <SelecionarHorario
        especialidades={especialidades}
        onSelecionarHorarios={setHorarios}
      />

      <ListarHorario
        horarios={horarios}
        onSelecionarHorario={setHorarioSelecionado}
      />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5">Agendar Consulta</Typography>
      <CadastrarAgendamento
        especialidades={especialidades}
        convenios={convenios}
        horarioSelecionado={horarioSelecionado}
        onAgendar={handleCadastrarAgendamento}
      />

      <ListarAgendamento
        agendamentos={agendamentos}
        onAtender={handleAtender}
      />
    </Box>
  );
}