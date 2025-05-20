import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from '@mui/material';
import { definirDisponibilidade } from '../../services/disponibilidadeService';
import { getEspecialidades } from '../../services/especialidadeService';

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

  React.useEffect(() => {
    async function carregar() {
      const lista = await getEspecialidades();
      setEspecialidades(lista);
    }
    carregar();
  }, []);

  const handleSalvar = async () => {
    const nova = {
      medico,
      especialidadeId: Number(especialidadeId),
      diaSemana,
      horaInicio,
      horaFim,
      duracaoConsultaMinutos: Number(duracao),
    };
    await definirDisponibilidade(nova);
    setMensagem('Disponibilidade cadastrada com sucesso!');
    setMedico('');
    setEspecialidadeId('');
    setDiaSemana('');
    setHoraInicio('');
    setHoraFim('');
    setDuracao('');
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Definir Disponibilidade de Horário
          </Typography>

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

          <Box display="flex" gap={2} mt={2}>
            <TextField
              label="Hora início"
              type="time"
              fullWidth
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Hora fim"
              type="time"
              fullWidth
              value={horaFim}
              onChange={(e) => setHoraFim(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <TextField
            label="Duração (minutos)"
            type="number"
            fullWidth
            margin="normal"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSalvar}
            disabled={
              !medico || !especialidadeId || !diaSemana || !horaInicio || !horaFim || !duracao
            }
          >
            Salvar Disponibilidade
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
