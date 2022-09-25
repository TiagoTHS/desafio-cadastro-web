
# Desafio Cadastro de Usuário

Uma aplicação de cadastro de usuário, permitindo o login do usuário cadastrado, a edição de dados desse usuário, e a exclusão da conta.

**Link da aplicação:** https://desafio-cadastro.onrender.com

A aplicação foi publicada na plataforma Render, que oferece hospedagem para o site (link acima), para a API e um banco de dados PostgreSQL.

*Essas três funcionalidades foram usadas nessa aplicação.*

---
Obs.: Uma demora na resposta para uma requisição pode ocorrecer devido ao plano gratuito da plataforma Render, que 'adormece' o serviço após 15 minutos de inatividade.


## Frontend

O Frontend da aplicação foi feito com o framework VueJs, permitindo a interação do usuário, uma SPA adaptada para Web e Mobile.

| Tecnologia | Finalidade |
|---|---|
| [Vuex](https://vuex.vuejs.org/) | Gerenciamento de estado para Vue |
| [Vue Router](https://router.vuejs.org/) | Navegação por rotas do app |
| [Axios](https://axios-http.com/) | Cliente HTTP para o navegador e node.js |


## Backend (API)

Uma API feita com NodeJs, criada para manipulação de usuários da aplicação.

**Link API:** https://desafio-cadastro-web.onrender.com

| Tecnologia | Finalidade |
|---|---|
| [Knex](https://knexjs.org/) | Construtor de consultas SQL
| [Jest](https://jestjs.io/) | Testes |
| [JWT](https://jwt.io/) | Token para autenticação |
| PostgreSQL | Banco de Dados Relacional |

## Documentação da API

| Parâmetro | Descrição |
|---|---|
| `id` | `id` do usuário referenciado|

### Rotas que não necessitam autenticação

#### Login na aplicação

```http
  POST /signin
```
+ Body
  ```
    {
      login: Email, CPF ou PIS do usuário
      password: Senha do usuário 
    }
  ```
+ Response
Esses dados serão armazenados no LocalStorage e utilizados para validação/autenticação
  ```
    {
      id: Id do usuário,
      name: Nome do usuário,
      email: Email do usuário,
      iat: Data de criação do token,
      exp: Data de expiração do token,
      token: Token JWT
    }
  ```

#### Novo Cadastro

```http
  POST /signup
```
+ Body
Todas os dados são obrigatórios, menos o `complement`
  ```
    {
      name: Nome do usuário
      email: Email do usuário
      password: Senha do usuário
      confirmPassword: Confirmação da senha
      country: País
      state: Estado
      city: Município
      zipcode: CEP
      street: Rua
      number: Número da casa
      complement: Complemento do endereço
      cpf: CPF do usuário
      pis: PIS do usuário
    }
  ```


#### Validação de um Token 

```http
  POST /validateToken
```
+ Body
  ```
    Dados de resposta da requisição signin
  ```

### Rotas que necessitam autenticação

#### Retorna uma lista com todos os usuários

```http
  GET /users
```
#### Retorna um usuário pelo id
Objeto usuário como visto no body do `signup`, mas sem `password` e `confirmPassword`

```http
  GET /users/${id}
```

#### Altera dados de um usuário
É enviado um body como no `signup` (sem `password` e `confirmPassword`) com as informações do usuário.

```http
  PUT /users/${id}
```

#### Exclui um usuário

```http
  DELETE /users/${id}
```

#### Mudar senha de um usuário

```http
  POST /users/${id}/changePassword
```
+ Body
  ```
    {
        password: Nova Senha
        confirmPassword: Confirmação da nova senha
    }
  ```


