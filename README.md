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



// For format details, see https://aka.ms/devcontainer.json. For config options, see the
// README at: https://github.com/devcontainers/templates/tree/main/src/docker-existing-docker-compose
{
	"name": "nestjs-with-tests-api",

	// Update the 'dockerComposeFile' list if you have more compose files or use different names.
	// The .devcontainer/docker-compose.yml file contains any overrides you need/want to make.
	"dockerComposeFile": [
		"../docker-compose.yaml",
		"docker-compose.yml"
	],

	// The 'service' property is the name of the service for the container that VS Code should
	// use. Update this value and .devcontainer/docker-compose.yml to the real service name.
	"service": "app",

	// The optional 'workspaceFolder' property is the path VS Code should open by default when
	// connected. This is typically a file mount in .devcontainer/docker-compose.yml
	"workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}",
	"features": {
		"ghcr.io/devcontainers/features/common-utils:2": {},
		"ghcr.io/devcontainers-contrib/features/zsh-plugins:0": {},
		"ghcr.io/stuartleeks/dev-container-features/shell-history:0": {}
	},
	"customizations": {
		"vscode": {
			"extensions": [
				"formulahendry.vscode-mysql",
				"dbaeumer.vscode-eslint",
				"rvest.vs-code-prettier-eslint",
				"firsttris.vscode-jest-runner",
				"zxh404.vscode-proto3",
				"bradlc.vscode-tailwindcss",
				"esbenp.prettier-vscode",
				"humao.rest-client",
				"azuretools.vscode-docker"
			]
		}
	}
 

	// Features to add to the dev container. More info: https://containers.dev/features.
	// "features": {},

	// Use 'forwardPorts' to make a list of ports inside the container available locally.
	// "forwardPorts": [],

	// Uncomment the next line if you want start specific services in your Docker Compose config.
	// "runServices": [],

	// Uncomment the next line if you want to keep your containers running after VS Code shuts down.
	// "shutdownAction": "none",

	// Uncomment the next line to run commands after the container is created.
	// "postCreateCommand": "cat /etc/os-release",

	// Configure tool-specific properties.
	// "customizations": {},

	// Uncomment to connect as an existing user other than the container default. More info: https://aka.ms/dev-containers-non-root.
	// "remoteUser": "devcontainer"
}

## Project Base

https://gitlab.fcalatam.com/fca/banco-fidis/ms8/invoices-service.git