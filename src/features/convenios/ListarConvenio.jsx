import { List, ListItem, ListItemText, Typography } from '@mui/material';

export default function ListarConvenio({ convenios }) {
  if (convenios.length === 0) {
    return <Typography sx={{ mt: 2 }}>Nenhum convênio cadastrado.</Typography>;
  }

  return (
    <List sx={{ mt: 2 }}>
      {convenios.map((conv) => (
        <ListItem key={conv.id} divider>
          <ListItemText primary={conv.nome} />
        </ListItem>
      ))}
    </List>
  );
}
