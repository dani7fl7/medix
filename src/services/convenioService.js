let convenios = [
    { id: 1, nome: 'Unimed' },
    { id: 2, nome: 'SulAmérica' },
  ];
  
  export function listarConvenios() {
    return Promise.resolve(convenios);
  }
  
  export function cadastrarConvenio(convenio) {
    convenios.push(convenio);
    return Promise.resolve(convenio);
  }
  