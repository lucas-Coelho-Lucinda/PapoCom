# PapoCom

Aplicação web SaaS desenvolvida para centralizar e organizar comunicações através de uma experiência moderna, intuitiva e escalável.

O projeto tem como objetivo explorar a construção de uma aplicação completa utilizando tecnologias modernas do ecossistema React, aplicando boas práticas de arquitetura, componentização, validação de dados e organização de código.

---

# Sobre o projeto

O PapoCom é uma aplicação SaaS voltada para gerenciamento e organização de comunicação.

A proposta do projeto é desenvolver uma solução capaz de estruturar fluxos de interação, proporcionando uma experiência organizada para usuários que precisam centralizar informações e acompanhar conversas.

Durante o desenvolvimento foram aplicados conceitos utilizados em aplicações modernas, como:

* Arquitetura baseada em componentes;
* Gerenciamento eficiente de dados assíncronos;
* Validação de informações;
* Criação de componentes reutilizáveis;
* Interface responsiva e escalável.

---

# Funcionalidades

> Atualizar conforme novas funcionalidades forem implementadas.

## Implementadas

* [ ] Estrutura inicial da aplicação;
* [ ] Sistema de rotas;
* [ ] Componentes reutilizáveis;
* [ ] Interface responsiva;
* [ ] Validação de formulários;
* [ ] Tratamento de feedbacks visuais.

## Em desenvolvimento

* [ ] Gerenciamento de conversas;
* [ ] Organização de contatos;
* [ ] Integração com serviços externos;
* [ ] Recursos avançados de comunicação.

---

# Tecnologias utilizadas

## Front-end

* **React 19**
  Construção da interface utilizando componentes reutilizáveis.

* **TypeScript**
  Tipagem estática para maior segurança, previsibilidade e manutenção do código.

* **Vite**
  Ambiente de desenvolvimento e ferramenta de build otimizada.

* **Tailwind CSS 4**
  Desenvolvimento da camada visual utilizando abordagem utility-first.

* **React Router DOM**
  Gerenciamento das rotas da aplicação.

---

## Gerenciamento de dados

* **TanStack React Query**
  Gerenciamento de requisições, cache e sincronização de dados assíncronos.

* **Axios**
  Comunicação com APIs e serviços externos.

---

## Formulários e validações

* **React Hook Form**
  Gerenciamento performático de formulários.

* **Zod**
  Validação e criação de schemas de dados.

* **Hook Form Resolvers**
  Integração entre formulários e validações.

---

## Interface e componentes

* **Radix UI**
  Componentes acessíveis e customizáveis para construção da interface.

* **Class Variance Authority (CVA)**
  Organização e controle de variantes dos componentes.

* **Sonner**
  Sistema de notificações e feedbacks para usuários.

* **tw-animate-css**
  Animações integradas ao ecossistema Tailwind CSS.

---

# Arquitetura do projeto

A aplicação segue uma estrutura baseada em separação de responsabilidades, buscando facilitar manutenção, escalabilidade e evolução do código.

Exemplo de organização:

```bash
src
├── assets
├── components
├── hooks
├── pages
├── routes
├── services
├── schemas
├── styles
└── utils
```

Responsabilidades:

* `components` → Componentes reutilizáveis da interface;
* `pages` → Páginas e estruturas principais;
* `services` → Comunicação com APIs;
* `hooks` → Lógicas reutilizáveis;
* `schemas` → Validações e contratos de dados;
* `utils` → Funções auxiliares.

---

# Como executar o projeto

## Pré-requisitos

Antes de iniciar, tenha instalado:

* Node.js
* npm

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/papocom.git
```

Acesse o diretório:

```bash
cd papocom
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

A aplicação estará disponível em:

```bash
http://localhost:5173
```

---

# Scripts disponíveis

```bash
npm run dev
```

Executa o ambiente de desenvolvimento.

```bash
npm run build
```

Realiza a build de produção.

```bash
npm run lint
```

Executa análise de qualidade do código.

```bash
npm run preview
```

Executa uma prévia da aplicação gerada.

---

# Decisões técnicas

Durante o desenvolvimento foram adotadas algumas decisões visando qualidade e evolução do projeto:

* Utilização de TypeScript para reduzir erros e melhorar a manutenção;
* Uso de React Query para controle eficiente de dados provenientes de APIs;
* Construção de componentes reutilizáveis utilizando Radix UI e CVA;
* Separação entre componentes visuais, regras de negócio e serviços;
* Utilização de validações estruturadas através de schemas.

---

# Próximos passos

Evoluções planejadas:

* Implementação completa dos fluxos SaaS;
* Integrações com serviços externos;
* Melhorias de experiência do usuário;
* Expansão dos módulos da aplicação;
* Aprimoramento da arquitetura conforme crescimento do produto.

---

# Autor

**Lucas Coelho Lucinda**

Desenvolvedor Front-end

GitHub:
https://github.com/seu-usuario

LinkedIn:
https://linkedin.com/in/seu-link

---

# Licença

Este projeto está sob a licença MIT.
