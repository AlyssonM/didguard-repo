# 08 - Matriz de Rastreabilidade

## 1. Descrição
Relaciona requisitos com camadas, artefatos de código e critérios de validação.

## 2. Objetivo
- Facilitar auditoria didática e avaliação de reprodução.

## 3. Matriz (resumo)

| Requisito | Camada principal | Artefatos | Validação |
|---|---|---|---|
| RF-001/RF-003 | Relayer/Firmware | `routes/provisioning.js`, `main.c` | `start/status/finish` funcionando |
| RF-004/RF-005 | Relayer/IPFS/Blockchain | `did.js`, `AccessControlDID.sol` | `getDidCid` com CID valido |
| RF-006 | Blockchain | `addTagCredential`, `getTagCredentials` | credencial listada |
| RF-007 | Dashboard/Relayer/Contrato | `dashboard/page.tsx`, `setAccess` | acesso permitido após concessão |
| RF-008 | Dashboard/Relayer/Contrato | `revokeCredential` | acesso negado após revogação |
| RF-009 | Firmware/Relayer | `security/*`, `rc522_func.c` | eventos `authorized/denied` |
| RF-010 | Frontend/Relayer | `FaceCapture`, `biometricAccessCheck` | retorno com `allowed + tagDid + tagUid` |
| RF-011 | Frontend/Relayer | `/login`, `/admin/login` | login biométrico funcional |
| RF-012 | Relayer/Frontend | `devices.js`, dashboard | cadastro/listagem de device |
| RF-013 | Relayer/Frontend | `didRegistrySearch` | busca por DID/nome/registro |
| RF-014 | Relayer/Frontend | `security/events`, dashboard | timeline atualizada |
| RF-015 | Relayer/Blockchain | `resync-from-data.js` | estado restaurado após recreate |

## 4. Critérios globais de aceite
1. Todos os testes de fluxo em `06-plano-de-execucao.md` concluídos.
2. Evidências de API e logs arquivadas.
3. Nenhum requisito RF critico sem evidencia.

## 5. Bibliografia
- IEEE 29148 (Requirements Engineering).
- V-Model de verificação e validação.






