import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { getEspecialidades } from '../../services/especialidadeService';
import AdminCard from '../../components/AdminCard';

export default function ListarEspecialidade() {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    async function carregar() {
      const lista = await getEspecialidades();
      setEspecialidades(lista);
    }
    carregar();
  }, []);

  return (
    <AdminCard title="Especialidades Cadastradas">
      {especialidades.length === 0 ? (
        <Typography color="text.secondary">Nenhuma especialidade cadastrada.</Typography>
      ) : (
        <List>
          {especialidades.map((esp) => (
            <React.Fragment key={esp.id}>
              <ListItem disablePadding>
                <ListItemText primary={esp.nome} sx={{ pl: 1 }} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </AdminCard>
  );
}
