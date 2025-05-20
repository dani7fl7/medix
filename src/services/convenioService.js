let conveniosMock = [
  { id: 1, nome: 'Unimed' },
  { id: 2, nome: 'SulAmérica' },
];

export async function getConvenios() {
  return conveniosMock;
}

export async function cadastrarConvenio({ nome }) {
  const novo = {
    id: conveniosMock.length + 1,
    nome,
  };
  conveniosMock.push(novo);
  return novo;
}
