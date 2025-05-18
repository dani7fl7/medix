import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { buscarHorarios } from '../../services/horariosService';

export default function SelecionarHorario({ especialidades, onSelecionarHorarios }) {
  const [especialidadeId, setEspecialidadeId] = useState('');
  const [data, setData] = useState('');
  const [medico, setMedico] = useState('');

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!especialidadeId || !data) return;

    const horarios = await buscarHorarios({ especialidadeId, data, medico });
    onSelecionarHorarios(horarios);
  };

  return (
    <Box component="form" onSubmit={handleBuscar} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Buscar horários disponíveis
      </Typography>

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

      <TextField
        label="Data (AAAA-MM-DD)"
        value={data}
        onChange={(e) => setData(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Médico (opcional)"
        value={medico}
        onChange={(e) => setMedico(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Buscar Horários
      </Button>
    </Box>
  );
}
