# 🚀 Clients API -- Desafio Técnico Positivo S+

API RESTful para gerenciamento de clientes desenvolvida como parte do
desafio técnico para Programador Pleno -- Positivo S+.

------------------------------------------------------------------------

# 🧱 Tecnologias Utilizadas

-   Node.js
-   NestJS
-   MongoDB
-   Docker
-   Docker Compose
-   Swagger / OpenAPI
-   Pino (logger estruturado)
-   Jest (testes unitários)

------------------------------------------------------------------------

# 🏗 Arquitetura do Projeto

A aplicação segue princípios de separação de responsabilidades:

Controller → Service → Repository → MongoDB

## Camadas

-   Controller → Interface HTTP
-   Service → Regras de negócio
-   Repository → Acesso ao banco
-   DTOs → Contratos de entrada e saída
-   Filters → Tratamento global de erros
-   Logger → Observabilidade estruturada

------------------------------------------------------------------------

# 📦 Estrutura de Pastas

src/ ├── clients/ │ ├── dto/ │ ├── repositories/ │ ├── schemas/ │ ├──
clients.controller.ts │ ├── clients.service.ts │ └── clients.module.ts
├── common/ │ └── filters/ └── main.ts

------------------------------------------------------------------------

# 📚 Funcionalidades

-   POST /clients\
-   GET /clients\
-   GET /clients/{id}\
-   PUT /clients/{id}\
-   PATCH /clients/{id}\
-   DELETE /clients/{id}

------------------------------------------------------------------------

# 📄 Modelo do Cliente

{ "id": "string", "name": "string", "email": "string", "document":
"string", "created_at": "datetime", "updated_at": "datetime" }

------------------------------------------------------------------------

# 📄 Paginação

O endpoint GET /clients retorna:

{ "data": \[...\], "meta": { "page": 1, "limit": 10, "total": 42,
"totalPages": 5 } }

------------------------------------------------------------------------

# ⚠ Tratamento de Erros

A API possui Exception Filter Global que padroniza erros:

{ "statusCode": 409, "message": "email already exists", "timestamp":
"2026-02-27T18:00:00.000Z", "path": "/clients" }

Inclui tratamento automático para: - NotFoundException -
ConflictException - Erros internos - Duplicate key do MongoDB (E11000)

------------------------------------------------------------------------

# 📊 Logs Estruturados

Utiliza Pino para logging estruturado.

Exemplo:

{ "level": "info", "context": "ClientsService", "message": "Client
created successfully", "clientId": "65f2..." }

------------------------------------------------------------------------

# 🐳 Executando com Docker

## Clonar repositório

git clone `<repo-url>`{=html} cd clients-api

## Subir containers

docker compose up --build

Aplicação disponível em: http://localhost:3333

------------------------------------------------------------------------

# 📖 Swagger

Disponível em: http://localhost:3333/docs

------------------------------------------------------------------------

# 🧪 Testes

npm run test

Inclui testes para: - ClientsService - ClientsController

------------------------------------------------------------------------

# 🔐 Variáveis de Ambiente

PORT=3333
MONGO_URI=mongodb://admin:admin@mongo:27017/clients?authSource=admin

------------------------------------------------------------------------

# 🧠 Decisões Técnicas

✔ Repository Pattern\
✔ Injeção por token\
✔ DTO de resposta\
✔ Paginação estruturada\
✔ Tratamento global de erros\
✔ Logger estruturado\
✔ Docker com autenticação Mongo

------------------------------------------------------------------------

# 🤖 Uso de Inteligência Artificial

Ferramentas de IA foram utilizadas como apoio para revisão arquitetural
e melhoria de boas práticas.\
Todas as decisões foram compreendidas e implementadas conscientemente.

------------------------------------------------------------------------

# 🎯 Diferenciais

-   Testes unitários\
-   Logger estruturado\
-   Tratamento automático de duplicate key\
-   Paginação com metadados\
-   Docker configurado corretamente

------------------------------------------------------------------------

# 📌 Considerações Finais

Projeto desenvolvido priorizando clareza, organização, escalabilidade e
boas práticas.
