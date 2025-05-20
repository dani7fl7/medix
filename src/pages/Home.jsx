import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { getEspecialidades } from '../services/especialidadeService';
import { getConvenios } from '../services/convenioService';
import {
  getDisponibilidadesPorMedico,
  buscarHorariosDisponiveis,
} from '../services/disponibilidadeService';
import { agendarConsulta } from '../services/agendamentoService';

const medicosPorEspecialidade = {
  1: ['Dr. João Silva', 'Dra. Ana Cardoso'],
  2: ['Dr. Pedro Souza', 'Dra. Marina Costa'],
};

const diasSemana = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

export default function Home() {
  const [nomePaciente, setNomePaciente] = useState('');
  const [convenios, setConvenios] = useState([]);
  const [convenioSelecionado, setConvenioSelecionado] = useState('');

  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('');

  const [medicosDisponiveis, setMedicosDisponiveis] = useState([]);
  const [medicoSelecionado, setMedicoSelecionado] = useState('');

  const [opcoesHorario, setOpcoesHorario] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  const [mensagemSucesso, setMensagemSucesso] = useState('');

  useEffect(() => {
    async function carregar() {
      const esp = await getEspecialidades();
      const conv = await getConvenios();
      setEspecialidades(esp);
      setConvenios(conv);
    }
    carregar();
  }, []);

  const gerarDataFutura = (diaSemanaDesejado) => {
    const dias = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    const targetIndex = dias.indexOf(diaSemanaDesejado);
    const hoje = new Date();
    let data = new Date(hoje);
    while (data.getDay() !== targetIndex) {
      data.setDate(data.getDate() + 1);
    }
    return data;
  };

  const handleEspecialidadeChange = (e) => {
    const id = e.target.value;
    setEspecialidadeSelecionada(id);
    setMedicoSelecionado('');
    setOpcoesHorario([]);
    setHorarioSelecionado(null);
    setMedicosDisponiveis(medicosPorEspecialidade[id] || []);
  };

  const handleMedicoChange = async (e) => {
    const nome = e.target.value;
    setMedicoSelecionado(nome);
    setHorarioSelecionado(null);

    const dias = await getDisponibilidadesPorMedico(nome, especialidadeSelecionada);

    const horariosTotais = [];

    for (const item of dias) {
      const dataObj = gerarDataFutura(item.diaSemana);
      const dataISO = dataObj.toISOString().split('T')[0];
      const horarios = await buscarHorariosDisponiveis({
        especialidadeId: especialidadeSelecionada,
        medico: nome,
        data: dataISO,
      });

      horarios.forEach((h) => {
        if (h.disponivel) {
          const dia = diasSemana[dataObj.getDay()];
          const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
          });
          horariosTotais.push({
            label: `${dia} ${dataFormatada} - ${h.horaInicio}`,
            value: {
              ...h,
              data: dataISO,
              diaSemana: item.diaSemana,
            },
          });
        }
      });
    }

    setOpcoesHorario(horariosTotais);
  };

  const handleAgendar = async () => {
    const dataHoraISO = `${horarioSelecionado.data}T${horarioSelecionado.horaInicio}:00Z`;
    const resultado = await agendarConsulta({
      paciente: nomePaciente,
      especialidadeId: especialidadeSelecionada,
      convenioId: convenioSelecionado,
      dataHora: dataHoraISO,
      medico: medicoSelecionado,
    });
    setMensagemSucesso(`Consulta agendada com ID ${resultado.id}`);
    setNomePaciente('');
    setConvenioSelecionado('');
    setEspecialidadeSelecionada('');
    setMedicoSelecionado('');
    setHorarioSelecionado(null);
    setOpcoesHorario([]);
  };

  return (
    <Box
      p={4}
      maxWidth={400}
      mx="auto"
      borderRadius={3}
      boxShadow={3}
      bgcolor="#f8f8f8"
    >
      <Typography variant="h5" fontWeight="bold" color="#2e7be8" mb={3}>
        Agende sua consulta
      </Typography>

      <TextField
        fullWidth
        label="Paciente"
        margin="normal"
        value={nomePaciente}
        onChange={(e) => setNomePaciente(e.target.value)}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Convênio</InputLabel>
        <Select
          value={convenioSelecionado}
          onChange={(e) => setConvenioSelecionado(e.target.value)}
          label="Convênio"
        >
          {convenios.map((conv) => (
            <MenuItem key={conv.id} value={conv.id}>
              {conv.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Especialidade</InputLabel>
        <Select
          value={especialidadeSelecionada}
          onChange={handleEspecialidadeChange}
          label="Especialidade"
        >
          {especialidades.map((esp) => (
            <MenuItem key={esp.id} value={esp.id}>
              {esp.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" disabled={!especialidadeSelecionada}>
        <InputLabel>Médico</InputLabel>
        <Select
          value={medicoSelecionado}
          onChange={handleMedicoChange}
          label="Médico"
        >
          {medicosDisponiveis.map((med, index) => (
            <MenuItem key={index} value={med}>
              {med}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" disabled={opcoesHorario.length === 0}>
        <InputLabel>Horário</InputLabel>
        <Select
          value={horarioSelecionado || ''}
          onChange={(e) => setHorarioSelecionado(e.target.value)}
          label="Horário"
        >
          {opcoesHorario.map((op, index) => (
            <MenuItem key={index} value={op.value}>
              {op.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        fullWidth
        variant="contained"
        color="success"
        sx={{ mt: 3 }}
        onClick={handleAgendar}
        disabled={
          !nomePaciente || !convenioSelecionado || !especialidadeSelecionada || !medicoSelecionado || !horarioSelecionado
        }
      >
        Agendar
      </Button>

      <Snackbar
        open={!!mensagemSucesso}
        autoHideDuration={4000}
        onClose={() => setMensagemSucesso('')}
      >
        <Alert severity="success" onClose={() => setMensagemSucesso('')}>
          {mensagemSucesso}
        </Alert>
      </Snackbar>
    </Box>
  );
}
