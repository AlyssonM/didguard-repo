# Workstation - Escopo e Responsabilidades

## 1. Descrição
Define o escopo da camada responsável pelo ambiente local de desenvolvimento do DIDGuard.

## 2. Objetivo
- Delimitar atividades de setup da máquina.
- Padronizar o ponto de partida da equipe.

## 3. Escopo funcional da camada
1. Instalar ferramentas base (Git, Docker, Node.js/Bun e Python).
2. Instalar IDE Antigravity para desenvolvimento assistido.
3. Instalar a extensão do PlatformIO em formato VSIX disponível no repositório.
4. Preparar dependências de software de cada módulo.
5. Validar execução mínima de frontend, relayer, blockchain e firmware.

## 4. Fora de escopo da camada
1. Alterações de regra de negócio do sistema.
2. Implementação de funcionalidades de produto.
3. Operação em infraestrutura de produção.

## 5. Regras de fronteira
1. O setup da workstation antecede o plano de execução integrado.
2. Extensões da IDE devem ser instaladas a partir dos artefatos da pasta `extensions/`.
3. A camada valida readiness do ambiente, não os fluxos funcionais completos.

## 6. Bibliografia
- Visual Studio Code Docs (Extensions).
- PlatformIO IDE.
- Docker Desktop Documentation.
