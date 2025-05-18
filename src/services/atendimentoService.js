import { listarAgendamentos } from './agendamentoService';

// Marca o agendamento como atendido
export function gerarAtendimento(id) {
  return listarAgendamentos().then((agendamentos) => {
    const index = agendamentos.findIndex((ag) => ag.id === id);
    if (index !== -1) {
      agendamentos[index].atendido = true;
    }
    return Promise.resolve(agendamentos[index]);
  });
}
