import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { cadastrarEspecialidade } from '../../services/especialidadeService';
import AdminCard from '../../components/AdminCard';

export default function CadastrarEspecialidade() {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastrar = async () => {
    const resultado = await cadastrarEspecialidade({ nome });
    if (resultado?.id) {
      setMensagem(`Especialidade cadastrada com ID ${resultado.id}`);
      setNome('');
    }
  };

  return (
    <>
      <AdminCard title="Cadastrar Especialidade">
        <TextField
          label="Nome da especialidade"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleCadastrar}
          disabled={!nome}
          sx={{ mt: 2 }}
        >
          Cadastrar
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
