# Sistema de cadastro de pagamentos

## Objetivos
Desenvolver um sistema utilizando Node JS e React, que permita o lançamento de pagamentos por meio de um formulário ou arquivo excel.

## Funcionalidades 

1. O sistema possui uma página web que permite aos usuários inserirem novos pagamentos na plataforma. O pagamento deve conter um **título**, um **valor**, uma **data**, um **imposto externo** e **comentários**. 

   1.1 Algumas regras são aplicadas antes que o registro seja inserido no banco de dados:

    * O título deve ter entre 5 e 100 caracteres;
    * O valor deve ser um número decimal. Qualquer valor não numérico não será ser aceito;
    * A data deve estar no padrão y-m-d (ano-mês-dia);
    * O imposto externo é um valor fixo de 5% do valor do pagamento e será calculado automaticamente;
    * A caixa de observações pode ou não ser preenchida pelo usuário;

   1.2 O sistema possui uma página web que lista todos os pagamentos cadastrados. Todos os dados dos pagamentos são listados, exibindo o **ID**, **título**, **valor**, **data**, **imposto externo** e **comentários**.

   1.3 Na lista de pagamentos, é possível excluir um pagamento selecionado ao clicar em um botão.

   1.4 Ainda na lista de pagamentos, é possível editar pagamentos ao clicar em um botão. As mesmas regras aplicadas na inserção equivalem para o recurso de edição.

2. Pagamentos podem ser pré-salvos em planilhas .xlsx (um arquivo simples do Excel). Através de uma página do sistema, pode-se fazer upload de um arquivo na plataforma, que irá validar os dados e cadastrar as informações no banco de dados.

## Frontend
O frontend foi desenvolvido em React. O sistema possui páginas de cadastro, consulta e edição de pagamentos. As seguintes bibliotecas foram utilizadas:

* axios
* react-dropzone
* react-icons
* react-router-dom

## Backend
A api do sistema foi desenvolvido em Node JS. As seguintes bibliotecas foram utilizadas:

* express
* sqlite3
* knex
* multer
* read-excel-file
* cors
* celebrate

## Banco de Dados
O banco de dados utilizado foi o SQLite. Ele é fácil de configurar e reside na própria aplicação.

## Como utilizar o sistema

Para utilizar o sistema, primeiro baixe as dependências entrando pelo terminal na pasta **server** e rodando o comando `yarn`. Repita o comando na pasta **web**.

Depois, basta abrir o terminal na pasta **server** e rodar o comando `npm run knex:migrate` ou `yarn knex:migrate` para criar o banco de dados,  e o comando `npm run dev` ou `yarn dev` para subir o servidor.

Após subir o servidor, abra o terminal na pasta **web** e rode o comando `npm start` ou `yarn start`.

Na raíz do projeto está um arquivo .xlsx que pode ser utilizado para cadastrar pagamentos no sistema pela página de uploads.