# Relayer Exemplo - Hello World

Exemplo de backend no mesmo estilo do `RelayerNode` do DIDGuard, com estrutura modular e endpoints básicos de teste.

## Estrutura
- `index.js`: bootstrap do servidor
- `src/context.js`: contexto de execução
- `src/routes.js`: agregador de rotas
- `src/routes/system.js`: rotas de saúde/estado
- `src/routes/hello.js`: rotas hello/echo
- `.env.example`: variáveis de ambiente
- `Dockerfile`: execução em container

## Instalação
```powershell
cd c:\ESP-Projects\didguard-repo\backend\relayer
npm install
```

## Execução local
```powershell
npm start
```

Servidor padrão: `http://localhost:3000`

## Endpoints
- `GET /` -> mensagem de início
- `GET /api` -> lista de endpoints
- `GET /api/health` -> saúde e uptime
- `GET /api/time` -> horário atual
- `GET /api/status` -> metadados do serviço
- `GET /api/hello` -> hello world
- `GET /api/hello/:name` -> hello com parâmetro
- `POST /api/echo` -> ecoa payload JSON

## Exemplos com curl
```powershell
curl http://localhost:3000/api/health
curl http://localhost:3000/api/time
curl http://localhost:3000/api/hello/Alysson
curl -X POST http://localhost:3000/api/echo -H "Content-Type: application/json" -d "{\"demo\":true,\"msg\":\"hello\"}"
```

## Rodar com Docker
```powershell
docker build -t didguard-relayer-example .
docker run --rm -p 3000:3000 didguard-relayer-example
```
