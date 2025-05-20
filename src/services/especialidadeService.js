let especialidadesMock = [
  { id: 1, nome: 'Cardiologia' },
  { id: 2, nome: 'Dermatologia' },
];

export async function getEspecialidades() {
  return especialidadesMock;
}

export async function cadastrarEspecialidade({ nome }) {
  const nova = {
    id: especialidadesMock.length + 1,
    nome,
  };
  especialidadesMock.push(nova);
  return nova;
}
