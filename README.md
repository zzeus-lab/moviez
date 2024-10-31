# Moviez
Este projeto roda uma API Node conectada ao banco de dados MySQL e um front-end Next.js.

1. A API é responsável por consumir dados em https://api.themoviedb.org/3/discover/movie e armazenar informações relevantes em sua base de dados automaticamente, através de uma cron job.
2. O front-end é responsável por listar todos os filmes com paginação para o usuário.

![image](https://github.com/user-attachments/assets/6d709b4c-aa4f-4fcc-bd30-35281100af8b)


## Tecnologias
Backend: **Node.js, TypeScript, Express, Sequelize**

Banco de Dados: **MySQL**

Frontend: **Next.js**

Cron: **node-cron para atualização periódica dos dados**

## Pré-requisitos
Node.js >= 20.x

MySQL >= 8.x

API Key do TMDB: Obtenha em TMDB API
  
## Instalação e Execução
### Portas padrão
Server(Express.js) :3000

Client(Next.js) :3001

### Iniciar banco de dados
No diretório raiz (onde está este README.md) 
```
docker-compose up -d
```
### Iniciar API
```
cd api
npm i
cp .env.example .env
```

Edite o arquivo .env e preencha o parâmetro TMDB_API_KEY com a sua chave e API TMDB.

Agora inicialize as tabelas do banco usando: 
```
npm run pre-start
npm start
```
Acesse a API em http://localhost:3000/api/movies.


### Iniciar Webapp
```
cd webapp
npm i
npm run build
npm start
```
Frontend disponível em http://localhost:3001


### Funcionalidades

Listagem de Filmes: GET /api/movies - Exibe filmes com paginação.

Sincronização Manual: POST /api/movies/sync - Atualiza os filmes com dados do TMDB.

Cron job: Executa automaticamente para manter a base de dados atualizada.



**Scripts Úteis**

Sincronizar Banco de Dados: npm run db:setup

![image](https://github.com/user-attachments/assets/2a406885-3b87-4c7b-a1bb-8fa490017830)
