# RelayerNode - Escopo e Responsabilidades

## 1. Descrição
Especifica responsabilidades do serviço de backend responsável por integração de camadas.

## 2. Objetivo
- Delimitar claramente o papel do relayer no DIDGuard.
- Estabelecer fronteiras entre lógica de negocio e operação das demais camadas.

## 3. Escopo funcional da camada
1. Expor APIs de provisionamento, segurança, DID, dispositivos e administração.
2. Integrar chamadas ao contrato inteligente.
3. Integrar persistência de DID document no IPFS.
4. Manter estado auxiliar para eventos e resync.
5. Enriquecer respostas para consumo do frontend.

## 4. Fora de escopo da camada
1. Controle físico do relé.
2. Captura bruta da biometria no dispositivo cliente.
3. Governanca de identidade em rede pública.

## 5. Regras de fronteira
1. Regras administrativas e de acesso passam pela API do relayer.
2. Escrita on-chain e mediada por conta autorizada da camada.
3. Persistência local auxilia operação, mas não substitui contrato/IPFS.

## 6. Bibliografia
- Express.js Documentation.
- Ethers.js Documentation.
- Twelve-Factor App.






