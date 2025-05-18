import { useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';

// Especialidades
import CadastrarEspecialidade from '../features/especialidades/CadastrarEspecialidade';
import ListarEspecialidade from '../features/especialidades/ListarEspecialidade';
import {
  listarEspecialidades,
  cadastrarEspecialidade,
} from '../services/especialidadeService';

// Convênios
import CadastrarConvenio from '../features/convenios/CadastrarConvenio';
import ListarConvenio from '../features/convenios/ListarConvenio';
import {
  listarConvenios,
  cadastrarConvenio,
} from '../services/convenioService';

export default function Admin() {
  const [especialidades, setEspecialidades] = useState([]);
  const [convenios, setConvenios] = useState([]);

  useEffect(() => {
    listarEspecialidades().then(setEspecialidades);
    listarConvenios().then(setConvenios);
  }, []);

  const handleCadastrarEspecialidade = async (nova) => {
    const resultado = await cadastrarEspecialidade(nova);
    setEspecialidades((prev) => [...prev, resultado]);
  };

  const handleCadastrarConvenio = async (novo) => {
    const resultado = await cadastrarConvenio(novo);
    setConvenios((prev) => [...prev, resultado]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Painel Administrativo
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5">Especialidades</Typography>
      <CadastrarEspecialidade onCadastrar={handleCadastrarEspecialidade} />
      <ListarEspecialidade especialidades={especialidades} />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5">Convênios</Typography>
      <CadastrarConvenio onCadastrar={handleCadastrarConvenio} />
      <ListarConvenio convenios={convenios} />
    </Box>
  );
}
