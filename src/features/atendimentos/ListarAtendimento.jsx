import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { getAtendimentos } from '../../services/atendimentoService';
import AdminCard from '../../components/AdminCard';

export default function ListarAtendimento() {
  const [atendimentos, setAtendimentos] = useState([]);

  useEffect(() => {
    async function carregar() {
      const lista = await getAtendimentos();
      setAtendimentos(lista);
    }
    carregar();
  }, []);

  return (
    <AdminCard title="Atendimentos Realizados">
      {atendimentos.length === 0 ? (
        <Typography color="text.secondary">Nenhum atendimento registrado.</Typography>
      ) : (
        <List>
          {atendimentos.map((at) => (
            <React.Fragment key={at.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`${at.paciente} — ${new Date(at.dataHora).toLocaleString('pt-BR')}`}
                  secondary={`Especialidade: ${at.especialidadeId} | Médico: ${at.medico}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </AdminCard>
  );
}
