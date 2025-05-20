import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';
import { cadastrarEspecialidade } from '../../services/especialidadeService';

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
    <Box maxWidth={500} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Cadastrar Especialidade
          </Typography>
          <TextField
            label="Nome da especialidade"
            fullWidth
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCadastrar}
            disabled={!nome}
          >
            Cadastrar
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
