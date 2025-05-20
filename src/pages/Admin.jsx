// src/pages/Admin.jsx
import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Divider,
} from '@mui/material';

import CadastrarEspecialidade from '../features/especialidades/CadastrarEspecialidade';
import ListarEspecialidade from '../features/especialidades/ListarEspecialidade';
import CadastrarConvenio from '../features/convenios/CadastrarConvenio';
import ListarConvenio from '../features/convenios/ListarConvenio';
import DefinirDisponibilidade from '../features/disponibilidades/DefinirDisponibilidade';
import GerarAtendimento from '../features/atendimentos/GerarAtendimento';
import ListarAtendimento from '../features/atendimentos/ListarAtendimento';

function TabPainel({ children, value, index }) {
  return value === index ? (
    <Box mt={3}>
      {children}
    </Box>
  ) : null;
}

export default function Admin() {
  const [abaSelecionada, setAbaSelecionada] = useState(0);

  const handleChange = (event, newValue) => {
    setAbaSelecionada(newValue);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Painel Administrativo
      </Typography>

      <Tabs
        value={abaSelecionada}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Especialidades" />
        <Tab label="Convênios" />
        <Tab label="Disponibilidade" />
        <Tab label="Atendimentos" />
      </Tabs>

      <Divider sx={{ my: 2 }} />

      {/* Abas */}
      <TabPainel value={abaSelecionada} index={0}>
        <CadastrarEspecialidade />
        <ListarEspecialidade />
      </TabPainel>

      <TabPainel value={abaSelecionada} index={1}>
        <CadastrarConvenio />
        <ListarConvenio />
      </TabPainel>

      <TabPainel value={abaSelecionada} index={2}>
        <DefinirDisponibilidade />
      </TabPainel>

      <TabPainel value={abaSelecionada} index={3}>
        <GerarAtendimento />
        <ListarAtendimento />
      </TabPainel>
    </Box>
  );
}
