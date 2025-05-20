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
import { getConvenios } from '../../services/convenioService';

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
    <Box maxWidth={500} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Convênios Cadastrados
          </Typography>
          <List>
            {convenios.map((conv) => (
              <React.Fragment key={conv.id}>
                <ListItem>
                  <ListItemText primary={conv.nome} />
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
