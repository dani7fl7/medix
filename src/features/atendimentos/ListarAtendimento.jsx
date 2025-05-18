import {
    List,
    ListItem,
    ListItemText,
    Box,
  } from '@mui/material';
  import GerarAtendimento from '../atendimentos/GerarAtendimento';
  
  export default function ListarAgendamento({ agendamentos, onAtender }) {
    if (agendamentos.length === 0) {
      return <p>Nenhum agendamento realizado.</p>;
    }
  
    return (
      <List sx={{ mt: 2 }}>
        {agendamentos.map((ag) => (
          <ListItem key={ag.id} divider secondaryAction={
            <GerarAtendimento agendamento={ag} onAtender={onAtender} />
          }>
            <ListItemText
              primary={`${ag.paciente} - ${ag.horario}`}
              secondary={`Especialidade ID: ${ag.especialidadeId} | Convênio ID: ${ag.convenioId}`}
            />
          </ListItem>
        ))}
      </List>
    );
  }
  