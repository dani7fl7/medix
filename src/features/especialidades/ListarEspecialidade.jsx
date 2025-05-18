import { List, ListItem, ListItemText, Typography } from '@mui/material';

export default function ListarEspecialidade({ especialidades }) {
  if (especialidades.length === 0) {
    return <Typography sx={{ mt: 2 }}>Nenhuma especialidade cadastrada.</Typography>;
  }

  return (
    <List sx={{ mt: 2 }}>
      {especialidades.map((esp) => (
        <ListItem key={esp.id} divider>
          <ListItemText primary={esp.nome} />
        </ListItem>
      ))}
    </List>
  );
}
