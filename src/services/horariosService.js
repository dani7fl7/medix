export function buscarHorarios({ especialidadeId, data, medico }) {
    // Simulação de horários retornados pela API
    const horarios = [
      {
        horaInicio: '08:00',
        horaFim: '08:30',
        disponivel: true,
      },
      {
        horaInicio: '08:30',
        horaFim: '09:00',
        disponivel: false,
        agendamentoId: 5,
        paciente: 'João da Silva',
      },
      {
        horaInicio: '09:00',
        horaFim: '09:30',
        disponivel: true,
      },
    ];
  
    return Promise.resolve(horarios);
  }
  