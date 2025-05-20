const disponibilidadesMock = [
  {
    id: 1,
    medico: 'Dr. João Silva',
    especialidadeId: 1, // Cardiologia
    diaSemana: 'Segunda-feira',
    horaInicio: '08:00',
    horaFim: '10:00',
    duracaoConsultaMinutos: 30,
  }
];

function obterDiaSemana(data) {
  const dias = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];
  return dias[new Date(data).getDay()];
}

function gerarHorarios({ horaInicio, horaFim, duracaoConsultaMinutos }) {
  const [hIni, mIni] = horaInicio.split(':').map(Number);
  const [hFim, mFim] = horaFim.split(':').map(Number);

  const inicio = new Date(0, 0, 0, hIni, mIni);
  const fim = new Date(0, 0, 0, hFim, mFim);

  const horarios = [];

  while (inicio < fim) {
    const proximo = new Date(inicio.getTime() + duracaoConsultaMinutos * 60000);
    horarios.push({
      horaInicio: inicio.toTimeString().slice(0, 5),
      horaFim: proximo.toTimeString().slice(0, 5),
      disponivel: true,
    });
    inicio.setTime(proximo.getTime());
  }

  return horarios;
}

export async function getDisponibilidadesPorMedico(medico, especialidadeId) {
  return disponibilidadesMock.filter(
    (d) => d.medico === medico && d.especialidadeId === especialidadeId
  );
}

export async function buscarHorariosDisponiveis({ especialidadeId, medico, data }) {
  const diaSemana = obterDiaSemana(data);

  const disponibilidade = disponibilidadesMock.find(
    (d) =>
      d.medico === medico &&
      d.especialidadeId === especialidadeId &&
      d.diaSemana === diaSemana
  );

  if (!disponibilidade) return [];

  return gerarHorarios(disponibilidade);
}

export async function definirDisponibilidade(data) {
  const nova = {
    id: disponibilidadesMock.length + 1,
    ...data,
  };
  disponibilidadesMock.push(nova);
  return nova;
}
