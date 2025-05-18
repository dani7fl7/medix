export default function CadastrarAgendamento({
    especialidades,
    convenios,
    horarioSelecionado,
    onAgendar,
  }) {
    const [paciente, setPaciente] = useState('');
    const [especialidadeId, setEspecialidadeId] = useState('');
    const [convenioId, setConvenioId] = useState('');
    const [horario] = useState(horarioSelecionado); // campo preenchido automaticamente
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!paciente || !especialidadeId || !convenioId || !horario) return;
  
      onAgendar({
        paciente,
        especialidadeId,
        convenioId,
        horario,
      });
  
      setPaciente('');
      setEspecialidadeId('');
      setConvenioId('');
    };
  
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Agendar Consulta
        </Typography>
  
        <TextField
          label="Nome do Paciente"
          value={paciente}
          onChange={(e) => setPaciente(e.target.value)}
          fullWidth
          margin="normal"
        />
  
        <FormControl fullWidth margin="normal">
          <InputLabel>Especialidade</InputLabel>
          <Select
            value={especialidadeId}
            onChange={(e) => setEspecialidadeId(e.target.value)}
          >
            {especialidades.map((esp) => (
              <MenuItem key={esp.id} value={esp.id}>
                {esp.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <FormControl fullWidth margin="normal">
          <InputLabel>Convênio</InputLabel>
          <Select
            value={convenioId}
            onChange={(e) => setConvenioId(e.target.value)}
          >
            {convenios.map((conv) => (
              <MenuItem key={conv.id} value={conv.id}>
                {conv.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <TextField
          label="Horário Selecionado"
          value={horario}
          disabled
          fullWidth
          margin="normal"
        />
  
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Agendar
        </Button>
      </Box>
    );
  }  