let agendamentosMock = [
  {
    id: 1,
    paciente: 'Maria Oliveira',
    especialidadeId: 1,
    especialidadeNome: 'Cardiologia',
    convenioId: 1,
    convenioNome: 'Unimed',
    dataHora: '2025-05-22T08:00:00Z',
    medico: 'Dr. João Silva',
  },
  {
    id: 2,
    paciente: 'João Pereira',
    especialidadeId: 2,
    especialidadeNome: 'Dermatologia',
    convenioId: 2,
    convenioNome: 'SulAmérica',
    dataHora: '2025-05-23T09:00:00Z',
    medico: 'Dra. Marina Costa',
  }
];

export async function getAgendamentos() {
  return agendamentosMock;
}

export async function agendarConsulta(data) {
  const novo = {
    id: agendamentosMock.length + 1,
    ...data,
    especialidadeNome: 'Cardiologia',
    convenioNome: 'Unimed',
  };
  agendamentosMock.push(novo);
  return novo;
}
