let agendamentos = [];

export function listarAgendamentos() {
  return Promise.resolve(agendamentos);
}

export function cadastrarAgendamento(agendamento) {
  const novo = { ...agendamento, id: Date.now() };
  agendamentos.push(novo);
  return Promise.resolve(novo);
}