import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { getAtendimentos } from '../../services/atendimentoService';

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
    <Box maxWidth={600} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Atendimentos Realizados
          </Typography>

          {atendimentos.length === 0 ? (
            <Typography color="text.secondary">Nenhum atendimento registrado.</Typography>
          ) : (
            <List>
              {atendimentos.map((at) => (
                <React.Fragment key={at.id}>
                  <ListItem>
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
        </CardContent>
      </Card>
    </Box>
  );
}
