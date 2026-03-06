# Laboratório do Capítulo 4 — Blockchain e Contratos Inteligentes

## Objetivo de aprendizagem

Ao final deste lab, o leitor será capaz de:

1. Explicar o que é um **contrato inteligente** e como ele difere de um programa convencional (imutabilidade, gas, consenso).
2. Implantar (*deploy*) um contrato Solidity em uma blockchain local usando **Hardhat**.
3. Chamar funções de **leitura** (view) e **escrita** (transação) em um contrato.
4. Capturar e interpretar **eventos** emitidos pelo contrato — entendendo seu papel como log de auditoria.
5. Relacionar o registro on-chain com o modelo de controle de acesso do DIDGuard.

> **Conexão com o capítulo:** este lab acompanha a Seção 4.5 ("Rodando na prática") e implementa concretamente o conceito de registro de permissões on-chain discutido na Seção 4.3.

> **Conexão com o DIDGuard:** o contrato `AccessRegistry` é uma versão simplificada do registro que o DIDGuard usa para armazenar permissões de acesso associadas a DIDs. Na arquitetura completa, o ESP32 consulta este registro (via relayer) para decidir se libera ou nega a entrada.

## Requisitos

- Node.js 18 ou superior
- npm 9 ou superior

## Arquivos

| Arquivo | Papel |
|---|---|
| `contracts/AccessRegistry.sol` | Contrato Solidity que armazena permissões de acesso |
| `scripts/deploy.js` | Script de implantação do contrato na blockchain local |
| `scripts/demo.js` | Script interativo que concede acesso, lê estado e captura eventos |
| `hardhat.config.js` | Configuração mínima do Hardhat |
| `package.json` | Dependências do projeto |

## Instalação

```bash
npm install
```

## Execução

### Opção A — Passo a passo (recomendada para entender cada fase)

**Terminal 1** — inicie a blockchain local:

```bash
npx hardhat node
```

Saída esperada: lista de 20 contas com saldo de 10000 ETH cada.

**Terminal 2** — implante o contrato:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Saída esperada:

```
AccessRegistry implantado em: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**Terminal 2** — execute a demonstração (copie o endereço acima):

No **PowerShell**:
```powershell
$env:ACCESS_REGISTRY_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3"
npx hardhat run scripts/demo.js --network localhost
```

No **Bash**:
```bash
ACCESS_REGISTRY_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3 npx hardhat run scripts/demo.js --network localhost
```

### Opção B — Script unificado (execução rápida)

```bash
npx hardhat run scripts/demo-auto.js --network localhost
```

Este script faz deploy + demo automaticamente, sem precisar copiar endereços.

## Saída esperada (demo.js)

```
Atualizando acesso de 0xabc123... (hash do DID "did:example:alice")
 ✓ Hash da transacao: 0x789def...
 ✓ Allowed: true
 ✓ ExpiresAt: 1709856000 (Unix timestamp, ~1h no futuro)
 ✓ Evento capturado: AccessUpdated
```

## Conceitos-chave ilustrados

| Conceito | Onde aparece no lab |
|---|---|
| **Transação vs. leitura** | `setAccess()` modifica estado (transação + gas); `getAccess()` apenas lê (view, sem gas) |
| **Eventos** | `AccessUpdated` é emitido em cada `setAccess()` — funciona como log imutável de auditoria |
| **Mapping** | `records[credentialId]` armazena dados indexados por hash — eficiente e privado |
| **Imutabilidade** | Uma vez implantado, o código do contrato não pode ser alterado |

## Exercícios propostos

1. **Revogar acesso:** chame `setAccess` com `allowed = false` e verifique que `getAccess` reflete a mudança.
2. **Múltiplas credenciais:** registre acesso para 3 DIDs diferentes e liste os eventos com um `queryFilter`.
3. **Contrato com owner:** adicione um modifier `onlyOwner` ao contrato para que apenas o deployer possa chamar `setAccess`.
4. **Expiração automática:** modifique `getAccess` para retornar `allowed = false` se `block.timestamp > expiresAt`.

## Troubleshooting

| Problema | Causa provável | Solução |
|---|---|---|
| `HardhatError: HH108` | Nó local não está rodando | Inicie `npx hardhat node` no Terminal 1 |
| `Error: Defina ACCESS_REGISTRY_ADDRESS` | Variável de ambiente não definida | Copie o endereço do deploy e exporte a variável |
| `npm install` falha | Conflito de versões | Delete `node_modules` e `package-lock.json`, depois rode `npm install` |
| Transação `reverted` | Contrato implantado em sessão anterior | Reinicie o `hardhat node` (cada restart zera a blockchain) |
