<p align="center">
  <img src="./public/M.png" alt="Logo Medix" width="200" />
</p>

# Medix - Sistema de Agendamento Médico

Este projeto é uma aplicação web desenvolvida em **React** com **Material UI**, que simula um sistema de agendamento de consultas médicas. Permite selecionar especialidades, médicos, convênios e horários disponíveis. Conta com um painel administrativo para cadastrar dados e visualizar agendamentos. Todas as interações são simuladas com **mocks de API REST**, conforme o teste prático.

---
<br>

## Como executar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/medix.git
cd medix
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o projeto em modo de desenvolvimento

```bash
npm run dev
```

O sistema estará disponível em: [http://localhost:5173](http://localhost:5173)

<br>

## Como executar com Docker

### 1. Build da imagem Docker

```bash
docker build -t medix-frontend .
```

### 2. Rode o container

```bash
docker run -d -p 3000:80 medix-frontend
```

A aplicação estará acessível em: [http://localhost:3000](http://localhost:3000)

<br>

## Funcionalidades

* Agendamento de consultas
* Filtro por especialidade, médico e convênio
* Definição de disponibilidade por médico e especialidade
* Admin para cadastro de especialidades e convênios
* Listagem de agendamentos e atendimentos 

<br>

## Tecnologias utilizadas

* React
* Vite
* Material UI

