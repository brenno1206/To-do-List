
<div align="center">
    
# To-Do List Full-Stack com Autenticação
Uma aplicação completa de lista de tarefas desenvolvida com Next.js, TypeScript e MySQL. Este projeto demonstra a criação de uma aplicação full-stack segura, desde a autenticação de usuários até o gerenciamento de dados em um ambiente de produção.

</div>

## 📸 Demonstração
Recomendação: Grave um GIF curto da aplicação funcionando, mostrando o cadastro, login, criação e edição de tarefas. Use uma ferramenta como ScreenToGif (Windows) ou Giphy Capture (macOS), salve o arquivo como demo.gif na pasta public do seu projeto e substitua a linha abaixo.

## 📖 Tabela de Conteúdos

<ul>
    <li>Sobre o Projeto</li>
    <li>Principais Funcionalidades</li>
    <li>Stack de Tecnologias</li>
    <li>Como executar localmente</li>
    <li>Deploy</li>
    <li>Licença</li>
</ul>

## 📌 Sobre o Projeto
Este não é apenas um simples "To-Do List". É um projeto full-stack robusto projetado para demonstrar competências essenciais no desenvolvimento web moderno. A aplicação permite que múltiplos usuários criem contas seguras para gerenciar suas listas de tarefas pessoais. Os dados de cada usuário são completamente isolados, garantindo privacidade e segurança.
A arquitetura foi construída seguindo as melhores práticas, com foco em segurança, escalabilidade e uma experiência de usuário fluida.

## ✨ Principais Funcionalidades
<ul>
    <li>✅ Autenticação Segura de Usuários: Sistema completo de Cadastro e Login.</li>
    <li>🔒 Proteção de Senhas: As senhas são criptografadas com bcryptjs antes de serem armazenadas, garantindo que nunca sejam expostas em texto puro.</li>
    <li>🛡️ Gerenciamento de Sessão: Sessões seguras gerenciadas com NextAuth.js (Auth.js), utilizando JSON Web Tokens (JWT).</li>
    <li>📝 CRUD Completo de Tarefas: Usuários autenticados podem Criar, Ler, Atualizar e Deletar suas próprias tarefas.</li>
    <li>🔐 Isolamento de Dados e API Protegida: As rotas da API validam a sessão a cada requisição, garantindo que um usuário só possa acessar seus próprios dados.</li>
    <li>📱 Design Responsivo: Interface construída com Tailwind CSS, totalmente adaptável para desktops e dispositivos móveis.</li>
</ul>


## 🚀 Stack de Tecnologias

<ul>
    <li> Frontend:
        <ul></ul>
    </li>
    <li> Backend:
        <ul></ul>
    </li>
    <li> Banco de dados:
        <ul></ul>
    </li> 
    <li> Infraestrutura e Deploy
        <ul></ul>
    </li>
</ul>
Frontend:

Next.js (com App Router)

React

TypeScript

Tailwind CSS

Backend:

Next.js API Routes

NextAuth.js

bcryptjs

Banco de Dados:

MySQL

mysql2 (Driver Node.js)

Infraestrutura e Deploy:

Aplicação: Vercel

Banco de Dados: TiDB Cloud (Compatível com MySQL)

## 🔧 Como Executar Localmente
Siga os passos abaixo para configurar e rodar o projeto na sua máquina.

Pré-requisitos:

Node.js (v18 ou superior)

Um servidor MySQL local ou uma conta gratuita no TiDB Cloud.

Passos:

Clone o repositório:

Bash
git clone https://github.com/brenno1206/To-do-List.git
cd To-do-List
Instale as dependências:

Bash
npm install
Configure o Banco de Dados:

Conecte-se ao seu servidor MySQL.

Crie um novo banco de dados (schema).

Execute os scripts SQL abaixo para criar as tabelas User e Task.

<details>
<summary>Clique para ver os comandos SQL</summary>

SQL
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
</details>

Configure as Variáveis de Ambiente:

Crie um arquivo chamado .env.local na raiz do projeto.

Copie e cole o conteúdo abaixo, preenchendo com suas credenciais:

Ini, TOML
### Credenciais do Banco de Dados (exemplo para banco local)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_seu_banco

### Chaves do NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=gere_uma_chave_secreta_aqui_com_o_comando_openssl
Rode a aplicação em modo de desenvolvimento:

Bash
npm run dev
Acesse http://localhost:3000 para ver a aplicação.

## ☁️ Deploy
A aplicação está configurada para deploy contínuo na Vercel. O banco de dados de produção está hospedado no TiDB Cloud. Cada push para a branch main aciona um novo deploy automaticamente.

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

