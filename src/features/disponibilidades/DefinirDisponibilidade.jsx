import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from '@mui/material';
import { definirDisponibilidade } from '../../services/disponibilidadeService';
import { getEspecialidades } from '../../services/especialidadeService';
import AdminCard from '../../components/AdminCard';

const diasSemana = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
];

export default function DefinirDisponibilidade() {
  const [medico, setMedico] = useState('');
  const [especialidadeId, setEspecialidadeId] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [duracao, setDuracao] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function carregar() {
      const lista = await getEspecialidades();
      setEspecialidades(lista);
    }
    carregar();
  }, []);

  const handleSalvar = async () => {
    await definirDisponibilidade({
      medico,
      especialidadeId: Number(especialidadeId),
      diaSemana,
      horaInicio,
      horaFim,
      duracaoConsultaMinutos: Number(duracao),
    });

    setMensagem('Disponibilidade cadastrada com sucesso!');
    setMedico('');
    setEspecialidadeId('');
    setDiaSemana('');
    setHoraInicio('');
    setHoraFim('');
    setDuracao('');
  };

  return (
    <>
      <AdminCard title="Definir Disponibilidade">
        <TextField
          label="Nome do médico"
          fullWidth
          margin="normal"
          value={medico}
          onChange={(e) => setMedico(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Especialidade</InputLabel>
          <Select
            value={especialidadeId}
            onChange={(e) => setEspecialidadeId(e.target.value)}
            label="Especialidade"
          >
            {especialidades.map((esp) => (
              <MenuItem key={esp.id} value={esp.id}>
                {esp.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Dia da semana</InputLabel>
          <Select
            value={diaSemana}
            onChange={(e) => setDiaSemana(e.target.value)}
            label="Dia da semana"
          >
            {diasSemana.map((dia) => (
              <MenuItem key={dia} value={dia}>
                {dia}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Hora início"
          type="time"
          fullWidth
          margin="normal"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Hora fim"
          type="time"
          fullWidth
          margin="normal"
          value={horaFim}
          onChange={(e) => setHoraFim(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Duração (minutos)"
          type="number"
          fullWidth
          margin="normal"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSalvar}
          disabled={
            !medico || !especialidadeId || !diaSemana || !horaInicio || !horaFim || !duracao
          }
        >
          Salvar
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
