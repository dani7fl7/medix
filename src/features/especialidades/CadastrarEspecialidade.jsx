import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

export default function CadastrarEspecialidade({ onCadastrar }) {
  const [nome, setNome] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) return;

    const novaEspecialidade = {
      id: Date.now(), // simula um ID único
      nome: nome.trim(),
    };

    onCadastrar(novaEspecialidade);
    setNome('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Nome da Especialidade"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Cadastrar
      </Button>
    </Box>
  );
}
