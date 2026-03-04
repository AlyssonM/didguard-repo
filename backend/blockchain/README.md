# Blockchain Exemplo - Greeter

Exemplo de modulo blockchain alinhado ao padrao do DIDGuard, usando Hardhat e um contrato simples `Greeter`.

## Estrutura
- `contracts/Greeter.sol`
- `ignition/modules/Greeter.js`
- `test/Greeter.test.js`
- `hardhat.config.js`
- `Dockerfile`

## Instalar dependencias
```powershell
npm install
```

## Compilar
```powershell
npm run compile
```

## Testar
```powershell
npm run test
```

## Rodar node local e deploy
Terminal 1:
```powershell
npm run node
```

Terminal 2:
```powershell
npm run deploy:localhost
```
