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
import { cadastrarConvenio } from '../../services/convenioService';

export default function CadastrarConvenio() {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastrar = async () => {
    const resultado = await cadastrarConvenio({ nome });
    if (resultado?.id) {
      setMensagem(`Convênio cadastrado com ID ${resultado.id}`);
      setNome('');
    }
  };

  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Cadastrar Convênio
          </Typography>
          <TextField
            label="Nome do convênio"
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
