import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { getConvenios } from '../../services/convenioService';
import AdminCard from '../../components/AdminCard';

export default function ListarConvenio() {
  const [convenios, setConvenios] = useState([]);

  useEffect(() => {
    async function carregar() {
      const lista = await getConvenios();
      setConvenios(lista);
    }
    carregar();
  }, []);

  return (
    <AdminCard title="Convênios Cadastrados">
      {convenios.length === 0 ? (
        <Typography color="text.secondary">Nenhum convênio cadastrado.</Typography>
      ) : (
        <List>
          {convenios.map((conv) => (
            <React.Fragment key={conv.id}>
              <ListItem disablePadding>
                <ListItemText primary={conv.nome} sx={{ pl: 1 }} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </AdminCard>
  );
}
