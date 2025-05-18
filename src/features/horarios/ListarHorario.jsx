import { Box, Button, Typography } from '@mui/material';

export default function ListarHorario({ horarios, onSelecionarHorario }) {
  if (!horarios || horarios.length === 0) {
    return <Typography sx={{ mt: 2 }}>Nenhum horário encontrado.</Typography>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Selecione um horário
      </Typography>

      {horarios.map((horario, index) => (
        <Button
          key={index}
          variant="outlined"
          color={horario.disponivel ? 'primary' : 'error'}
          disabled={!horario.disponivel}
          onClick={() =>
            onSelecionarHorario(`${horario.horaInicio}-${horario.horaFim}`)
          }
          sx={{ m: 1 }}
        >
          {horario.horaInicio} - {horario.horaFim}
          {!horario.disponivel && ` (Agendado)`}
        </Button>
      ))}
    </Box>
  );
}