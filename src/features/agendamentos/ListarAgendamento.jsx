import {
    List,
    ListItem,
    ListItemText,
    Typography,
  } from '@mui/material';
  
  export default function ListarAgendamento({ agendamentos }) {
    if (agendamentos.length === 0) {
      return <Typography sx={{ mt: 2 }}>Nenhum agendamento realizado.</Typography>;
    }
  
    return (
      <List sx={{ mt: 2 }}>
        {agendamentos.map((ag) => (
          <ListItem key={ag.id} divider>
            <ListItemText
              primary={`${ag.paciente} - ${ag.horario}`}
              secondary={`Especialidade ID: ${ag.especialidadeId} | Convênio ID: ${ag.convenioId}`}
            />
          </ListItem>
        ))}
      </List>
    );
  }
  