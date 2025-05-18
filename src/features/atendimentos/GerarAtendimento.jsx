import { Button } from '@mui/material';

export default function GerarAtendimento({ agendamento, onAtender }) {
  if (agendamento.atendido) {
    return <span style={{ color: 'green' }}>Atendido</span>;
  }

  return (
    <Button
      variant="outlined"
      color="success"
      size="small"
      onClick={() => onAtender(agendamento.id)}
    >
      Marcar como atendido
    </Button>
  );
}