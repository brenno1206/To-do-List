# To-Do List App

Um aplicativo simples e moderno de lista de tarefas construído com Next.js, React e TypeScript. Permite que os usuários gerenciem suas tarefas diárias de forma eficiente, salvando os dados diretamente no navegador através do `localStorage`.

### Clique para assistir o vídeo de uso da aplicação

[![Assista ao vídeo](https://img.youtube.com/vi/NoIxocZwrCQ/maxresdefault.jpg)](https://youtu.be/NoIxocZwrCQ)

---

## Funcionalidades

- **Adicionar Tarefas**: Crie novas tarefas com um título e uma descrição opcional.
- **Editar Tarefas**: Modifique o título e a descrição de tarefas existentes.
- **Remover Tarefas**: Exclua tarefas da lista.
- **Marcar como Concluída**: Marque tarefas como finalizadas com um efeito visual de "riscado".
- **Expandir Detalhes**: Visualize a descrição completa de uma tarefa.
- **Design Responsivo**: Interface limpa e funcional em diferentes tamanhos de tela.
- **Persistência de Dados**: As tarefas são salvas no `localStorage` do navegador, para que não se percam ao recarregar a página.

---

## Tecnologias Utilizadas

- **Framework**: [Next.js](https://nextjs.org/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)

---

## Como Executar o Projeto

Siga os passos abaixo para rodar o projeto em seu ambiente local.

### **Pré-requisitos**

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- Um gerenciador de pacotes como [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/)

### **Instalação**

1.  Clone o repositório:

    ```bash
    git clone https://github.com/brenno1206/To-do-List.git
    ```

2.  Navegue até o diretório do projeto:

    ```bash
    cd seu-repositorio
    ```

3.  Instale as dependências:
    ```bash
    npm install
    ```

### **Executando a Aplicação**

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

---

## Futuras Implementações

O projeto atual utiliza `localStorage` para simplicidade. Os próximos passos envolvem a implementação de um backend robusto com banco de dados e autenticação de usuários.

### 1. Autenticação de Usuários

Para garantir que cada usuário tenha sua própria lista de tarefas privada, a autenticação será adicionada.

- **Plano de Ação**:
  1.  Integrar um provedor de autenticação (email/senha).
  2.  Criar rotas de login, cadastro e logout.
  3.  Proteger as páginas da aplicação para que apenas usuários autenticados possam acessar e gerenciar suas tarefas.
  4.  Associar cada tarefa a um `userId`.

### 2. Armazenamento com Banco de Dados MySQL

Para substituir o `localStorage` e permitir que os dados sejam persistidos de forma segura e acessíveis de qualquer dispositivo, um banco de dados MySQL será integrado.

- **Plano de Ação**:
  1.  **Configurar o Banco de Dados**: Instalar e configurar um servidor MySQL.
  2.  **Definir o Schema**: Criar as tabelas `Users` e `Tasks` no banco de dados.
  3.  **Criar API Endpoints**: Desenvolver rotas de API no Next.js (em `app/api/tasks/...`) para lidar com as operações **CRUD** (Create, Read, Update, Delete).
  4.  **Atualizar o Frontend**: Modificar os componentes React para fazer chamadas a essas novas rotas de API em vez de interagir com o `localStorage`. Todas as funções (`addNewTask`, `removeTask`, `updateTask`) serão refatoradas para se comunicarem com o backend.
