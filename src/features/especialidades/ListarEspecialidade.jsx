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
import { getEspecialidades } from '../../services/especialidadeService';

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
    <Box maxWidth={500} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Especialidades Cadastradas
          </Typography>
          <List>
            {especialidades.map((esp) => (
              <React.Fragment key={esp.id}>
                <ListItem>
                  <ListItemText primary={esp.nome} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
