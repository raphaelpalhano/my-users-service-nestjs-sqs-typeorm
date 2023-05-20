<h2 align="center">API de Usuário</h2>

---------------------------------------------------------------

##### :zap: Tecnologias

* Typescript
* NestJS
* TypeORM
* SQS
* MySQL
* Jest

---------------------------------------------------------------

##### :zap: Premissas

* utilize os padrões (diretórios) do Micro Serviço `invoices-service` adotados no `MS8`
* todas as regras de negócio deverá estar coberta por testes unitários
* todas as rotas deverão ter pelo menos um test e2e
* cada registro salvo deverá gerar uma mensagem em uma fila SQS
  * Utilize o localstack para isso
  * Fila: `SQS_USERS`
  * Utilize o`@ssut/nestjs-sqs` para controlar a fila

---------------------------------------------------------------

<h4 align="center">CRUD</h4>

##### :zap:  CREATE User

[ ] - rota: `POST /users`

[ ] - payload válido
```ts
{
  name: string,
  email: string,
  password: string,
  birthDate: Date
}
```

[ ] - validar se e-mail é válido (regex ou class validator)

[ ] - não permitir cadastrar e-mail duplicado

[ ] - não permitir cadastro de usuários menores de 18 anos

[ ] - password deverá ter pelo menos 8 caracteres

[ ] - usuário deverá ser salvo com password criptografado

[ ] - retornar o usuário cadastrado

[ ] - retorno válido: User

* não exibir campo password 
* exibir idade calculada do usuário em anos

[ ] - controller não deverá aceitar campos diferentes do payload válido

---------------------------------------------------------------


##### :zap:  RETRIEVE User

[ ] - rota: `GET /users/:id`

[ ] - retorno válido: User

* não exibir campo password 
* exibir idade calculada do usuário em anos

[ ] - retornar um erro caso o usuário não seja encontrado

---------------------------------------------------------------

##### :zap:  LIST Users

[ ] - rota: `GET /users`

[ ] - retorno válido: User[]

* não exibir campo password 
* exibir idade calculada do usuário em anos

---------------------------------------------------------------

##### :zap: UPDATE User

[ ] - rota: `PUT /users/:id`

[ ] - payload válido
```ts
{
  name: string,
  password: string,
  birthDate: Date
}
```

[ ] - usuário poderá atualizar um ou mais campos de uma vez

[ ] - retornar o usuário atualizado

[ ] - retorno válido: User

* não exibir campo password 
* exibir idade calculada do usuário em anos

[ ] - retornar um erro caso o usuário não seja encontrado

[ ] - controller não deverá aceitar campos diferentes do payload válido

---------------------------------------------------------------

##### :zap:  DELETE User

[ ] - rota: `DELETE /users/:id`

[ ] - retornar o usuário excluído

[ ] - retorno válido: User

* não exibir campo password 
* exibir idade calculada do usuário em anos

[ ] - retornar um erro caso o usuário não seja encontrado

---------------------------------------------------------------

## Responsabilidade de Servicos

### Auth

**Criar o usuario**

Basicamente sera passado o payload definido:

{
	"name": "string",
	"email: "string",
	"password":  "string" -> hash,
	birthDate: Date

}

**Logar**
O usuario precisa passar o email e password



## gitflow
### Configurando 
git flow init

O git flow já vem com o git instalado e após executar o comando ele irá perguntar sobre as branchs.

Branch de produção?
 A branch de desenvolvimento?
Branch de support? [feature, bugfix]
 

OBS: Ao finalizar todas as perguntas o git flow irá direcionar para branch develop de imediato.



Segundo passo: alterações na develop

Faça as alterações na branch develop conforme o escopo, e comece os commits.

Comandos

git add .

git commit -m “....”

### feature

Novas funcionalidades e atualização: branch feature

Passando para branch feature para desenvolver uma nova atualização dentro do projeto e manter a develop funcionando.


 git flow feature start function_stages


git flow - é o comando que indica que você está trabalhando com git flow
feature - é o comando para indicar que você vai iniciar ou finalizar o trabalho em uma branch feature.
start - comando que indica que você vai começar algo novo.
function_stages - é o nome da branch feature.


Comece a fazer as alterações e atualizações na branch feature conforme foi definido. Depois comece os commits.

 git add .

git commit -m “add function stages control”


Não tem mais nada para alterar, pode voltar para develop

git flow feature finish function_stages


Vai fazer o merge para develop e  excluir a branch localmente e do github e mudar para develop.



Ou 

      2.1. Continuar o desenvolvimento da funcionalidade daquela feature, faz o publish.

git flow feature publish function_stages 


Vai fazer o push da branch feature no github, ou, o repositório que estiver utilizando.





## Project Base

https://gitlab.fcalatam.com/fca/banco-fidis/ms8/invoices-service.git