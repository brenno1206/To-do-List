# To-Do List Full-Stack com Autenticação

Uma aplicação completa de lista de tarefas desenvolvida com Next.js, TypeScript e MySQL. Este projeto demonstra a criação de uma aplicação full-stack segura, desde a autenticação de usuários até o gerenciamento de dados em um ambiente de produção.

## 📸 Demonstração

<div align="center">
  <img src="./public/demo.gif" alt="Demonstração da Aplicação To-Do List" width="800"/>
</div>

## 📖 Tabela de Conteúdos

- [Sobre o Projeto](#-sobre-o-projeto)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Stack de Tecnologias](#-stack-de-tecnologias)
- [Como Executar Localmente](#-como-executar-localmente)
- [Deploy](#-deploy)
- [Licença](#-licença)
- [Autor](#-autor)

## 📌 Sobre o Projeto

Este não é apenas um simples "To-Do List". É um projeto full-stack robusto projetado para demonstrar competências essenciais no desenvolvimento web moderno. A aplicação permite que múltiplos usuários criem contas seguras para gerenciar suas listas de tarefas pessoais. Os dados de cada usuário são completamente isolados, garantindo privacidade e segurança.

A arquitetura foi construída seguindo as melhores práticas, com foco em segurança, escalabilidade e uma experiência de usuário fluida.

## ✨ Principais Funcionalidades

- ✅ **Autenticação Segura de Usuários**: Sistema completo de Cadastro e Login.
- 🔒 **Proteção de Senhas**: As senhas são criptografadas com `bcryptjs` antes de serem armazenadas, garantindo que nunca sejam expostas em texto puro.
- 🛡️ **Gerenciamento de Sessão**: Sessões seguras gerenciadas com NextAuth.js (Auth.js), utilizando JSON Web Tokens (JWT).
- 📝 **CRUD Completo de Tarefas**: Usuários autenticados podem Criar, Ler, Atualizar e Deletar suas próprias tarefas.
- 🔐 **Isolamento de Dados e API Protegida**: As rotas da API validam a sessão a cada requisição, garantindo que um usuário só possa acessar seus próprios dados.

## 🚀 Stack de Tecnologias

#### Frontend:

- **Framework:** Next.js (com App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **UI:** React

#### Backend:

- **API:** Next.js API Routes
- **Autenticação:** NextAuth.js
- **Segurança:** bcryptjs

#### Banco de Dados:

- **SGBD:** MySQL
- **Driver:** mysql2 (Node.js)

#### Infraestrutura e Deploy:

- **Aplicação:** Vercel
- **Banco de Dados:** TiDB Cloud

## 🔧 Como Executar Localmente

Siga os passos abaixo para configurar e rodar o projeto na sua máquina.

**Pré-requisitos:**

- Node.js (v18 ou superior)
- Um servidor MySQL local ou uma conta gratuita no TiDB Cloud.

**Passos:**

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/brenno1206/To-do-List.git](https://github.com/brenno1206/To-do-List.git)
    cd To-do-List
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**
    - Conecte-se ao seu servidor MySQL e crie um novo banco de dados (schema).
    - Execute os scripts SQL abaixo para criar as tabelas `User` e `Task`.
      <details>
      <summary>Clique para ver os comandos SQL</summary>

      ```sql
      CREATE TABLE User (
        idUser INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (idUser)
      );

      CREATE TABLE Task (
        idTask INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TINYTEXT NULL,
        idUser INT NOT NULL,
        PRIMARY KEY (idTask),
        CONSTRAINT fk_Task_User
          FOREIGN KEY (idUser)
          REFERENCES User(idUser)
      );
      ```

      </details>

4.  **Configure as Variáveis de Ambiente:**
    - Crie um arquivo chamado `.env.local` na raiz do projeto.
    - Copie e cole o conteúdo abaixo, preenchendo com suas credenciais:

    ```ini
    # Credenciais do Banco de Dados (exemplo para banco local)
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha
    DB_DATABASE=nome_do_seu_banco

    # Chaves do NextAuth.js
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=gere_uma_chave_secreta_aqui_com_o_comando_openssl
    ```

5.  **Rode a aplicação em modo de desenvolvimento:**
    `bash
npm run dev
`
    Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## ☁️ Deploy

A aplicação está configurada para deploy contínuo na **Vercel**. O banco de dados de produção está hospedado no **TiDB Cloud**. Cada `push` para a branch `main` aciona um novo deploy automaticamente.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido por **Brenno Gomes Breda**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/brennogbreda/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/brenno1206/)
