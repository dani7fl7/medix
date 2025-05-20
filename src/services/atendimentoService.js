const atendimentosMock = [];

export async function gerarAtendimento({ agendamentoId }) {
  const novo = {
    id: atendimentosMock.length + 1,
    paciente: `Paciente ${agendamentoId}`,
    dataHora: new Date().toISOString(),
    especialidadeId: 1,
    medico: 'Dr. João Silva',
  };
  atendimentosMock.push(novo);
  return novo;
}

export async function getAtendimentos() {
  return atendimentosMock;
}
