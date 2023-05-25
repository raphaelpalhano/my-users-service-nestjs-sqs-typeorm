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

* utilize os padrões (diretórios) do Micro Serviço `invoices-service` adotados no `MS8` x
* todas as regras de negócio deverá estar coberta por testes unitários x
* todas as rotas deverão ter pelo menos um test e2e x
* cada registro salvo deverá gerar uma mensagem em uma fila SQS ?
  * Utilize o localstack para isso ?
  * Fila: `SQS_USERS` ?
  * Utilize o`@ssut/nestjs-sqs` para controlar a fila ?

---------------------------------------------------------------

<h4 align="center">CRUD</h4>

##### :zap:  CREATE User

[x ] - rota: `POST /users`

[ x] - payload válido
```ts
{
  name: string,
  email: string,
  password: string,
  birthDate: Date
}
```

[x ] - validar se e-mail é válido (regex ou class validator)

[ x] - não permitir cadastrar e-mail duplicado

[x ] - não permitir cadastro de usuários menores de 18 anos

[x ] - password deverá ter pelo menos 8 caracteres

[ x] - usuário deverá ser salvo com password criptografado

[ x] - retornar o usuário cadastrado

[ x] - retorno válido: User

* não exibir campo password x
* exibir idade calculada do usuário em anosx

[ x] - controller não deverá aceitar campos diferentes do payload válido

---------------------------------------------------------------


##### :zap:  RETRIEVE User

[x ] - rota: `GET /users/:id`

[x ] - retorno válido: User

* não exibir campo password x
* exibir idade calculada do usuário em anos x

[x ] - retornar um erro caso o usuário não seja encontrado

---------------------------------------------------------------

##### :zap:  LIST Users

[ x] - rota: `GET /users`

[x ] - retorno válido: User[]

* não exibir campo password  x
* exibir idade calculada do usuário em anos x

---------------------------------------------------------------

##### :zap: UPDATE User

[x ] - rota: `PATCH /users/:id`

[ x] - payload válido
```ts
{
  name: string,
  password: string,
  birthDate: Date
}
```

[ x] - usuário poderá atualizar um ou mais campos de uma vez

[x ] - retornar o usuário atualizado

[ x] - retorno válido: User

* não exibir campo password x
* exibir idade calculada do usuário em anos x

[x ] - retornar um erro caso o usuário não seja encontrado

[x ] - controller não deverá aceitar campos diferentes do payload válido

---------------------------------------------------------------

##### :zap:  DELETE User

[ x] - rota: `DELETE /users/:id`

[ x ] - retornar o usuário excluído

[ x] - retorno válido: User

* não exibir campo password 
* exibir idade calculada do usuário em anos

[ x] - retornar um erro caso o usuário não seja encontrado

---------------------------------------------------------------

## Responsabilidade de Servicos

### Auth

**Logar**
O usuario precisa passar o email e password

{
	"email: "string",
	"password":  "string" -> hash,

}

Generate Token: 21312asdsajo12je102j12djos

Passar token no header: Berear: Token




## LocalStack

### Start

docker run \
  --rm -it \
  -p 4566:4566 \
  -p 4510-4559:4510-4559 \
  localstack/localstack

docker compose:

 localstack:
    container_name: "${LOCALSTACK_DOCKER_NAME-localstack_main}"
    image: localstack/localstack
    ports:
      - "127.0.0.1:4566:4566"            # LocalStack Gateway
      - "127.0.0.1:4510-4559:4510-4559"  # external services port range
    environment:
      - DEBUG=${DEBUG-}
      - DOCKER_HOST=unix:///var/run/docker.sock
    volumes:
      - "${LOCALSTACK_VOLUME_DIR:-./volume}:/var/lib/localstack"
      - "/var/run/docker.sock:/var/run/docker.sock"

