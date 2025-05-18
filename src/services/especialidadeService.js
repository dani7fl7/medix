let especialidades = [
    // simulação de dados iniciais
    { id: 1, nome: 'Cardiologia' },
    { id: 2, nome: 'Dermatologia' },
  ];
  
  // Simula GET
  export function listarEspecialidades() {
    return Promise.resolve(especialidades);
  }
  
  // Simula POST
  export function cadastrarEspecialidade(especialidade) {
    especialidades.push(especialidade);
    return Promise.resolve(especialidade);
  }
  