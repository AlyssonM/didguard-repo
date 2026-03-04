# Workstation - Guia de Instalação e Configuração

## 1. Descrição
Passo a passo completo para instalar, configurar e validar a workstation de desenvolvimento do DIDGuard no Windows.

## 2. Objetivo
- Garantir que qualquer aluno consiga preparar o ambiente do zero.
- Reduzir falhas de setup.

## 3. Escopo deste guia
1. Instalação de ferramentas base.
2. Instalação da IDE Antigravity.
3. Instalação das extensões `.vsix` do repositório.
4. Instalação das dependências por módulo.
5. Validação completa do ambiente.

## 4. Pré-condições
1. Sistema operacional Windows 10/11.
2. Permissão para instalar software na máquina.
3. Repositório clonado localmente em `C:\[diretorio]\didguard`.
4. Conexão de internet para download de dependências.

## 5. Instalação das ferramentas base

### 5.1 Git
1. Instalar Git pelo [instalador oficial](https://git-scm.com/install/windows).
2. Validar no PowerShell:
   - `git --version`

### 5.2 Docker Desktop
1. Instalar Docker Desktop pelo [instalador oficial](https://docs.docker.com/desktop/setup/install/windows-install/).
2. Abrir o Docker Desktop e aguardar inicialização.
3. Validar:
   - `docker --version`
   - `docker compose version`

### 5.3 Node.js
1. Instalar Node.js LTS no windows usando chocolatey e npm.
```powershell
# Baixar e instalar o Chocolatey:
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"
# Baixar e instalar o Node.js:
choco install nodejs --version="24.14.0"
# Verifique a versão do Node.js:
node -v # Deve exibir "v24.14.0".
# Verificar a versão do npm:
npm -v # Deve imprimir "11.9.0".
```
2. Validar:
   - `node --version`
   - `npm --version`

### 5.4 Bun
1. Instalar [Bun](https://bun.com/docs/installation#windows) no windows:
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```
2. Fechar e abrir o terminal.
3. Validar:
```terminal
   - `bun --version`
```

### 5.5 Python
1. Instalar [Python](https://www.python.org/downloads/) 3.x se não disponível.
2. Validar:
```terminal
   - `python --version`
```

## 6. Instalação da IDE Antigravity
1. Instalar Antigravity no windows com o [pacote oficial](https://antigravity.google/download).
2. Abrir a IDE.
3. Abrir o workspace em `C:\[diretorio]\didguard`.
4. Confirmar que a IDE reconhece as pastas `Frontend`, `RelayerNode`, `Blockchain` e `ESP32Device.pio`.

## 7. Instalação das extensões VSIX do projeto

### 7.1 Instalação pela interface da IDE (recomendada)
1. Abrir painel de extensões.
2. Selecionar "Install from VSIX".
3. Instalar:
   - `extensions/platformio.platformio-ide-3.3.4-win32-x64.vsix`

### 7.2 Verificação das extensões
1. Confirmar no painel de extensões que a extensão do PlatformIO está habilitada.
2. Confirmar que a barra de status da IDE mostra recursos do PlatformIO ao abrir `ESP32Device.pio`.

## 8. Instalação de dependências por módulo

### 8.1 Frontend
1. `cd C:\[diretorio]\didguard\Frontend`
2. `bun install`
3. Validação:
   - `bun run build`

### 8.2 RelayerNode
1. `cd C:\[diretorio]\didguard\RelayerNode`
2. `npm install`
3. Validação:
   - `npm run lint` (se disponível)
   - ou `node -v` + `npm run start` (smoke test)

### 8.3 Blockchain
1. `cd C:\[diretorio]\didguard\Blockchain`
2. `npm install`
3. Validação:
   - `npx hardhat --version`
   - `npx hardhat test`

### 8.4 Firmware (via extensão PlatformIO)
1. Abrir `C:\[diretorio]\didguard\ESP32Device.pio` na IDE.
2. Executar `Build` pela interface do PlatformIO.
3. Com ESP32 conectado, executar `Upload`.
4. Abrir Serial Monitor em `115200`.

## 9. Configuração mínima recomendada
1. Terminal padrão: PowerShell.
2. Node e Bun disponíveis no `PATH`.
3. Docker Desktop com engine ativo antes de subir containers.
4. Manter o mesmo diretório base para todos os alunos (`C:\[diretorio]\`).

## 10. Validação integrada (smoke test da workstation)
1. Subir serviços:
   - `cd C:\[diretorio]\didguard`
   - `docker compose up -d --build`
2. Validar relayer:
   - `Invoke-RestMethod "http://localhost:3000/api/time"`
3. Validar frontend:
   - `cd Frontend`
   - `bun run dev`
   - abrir `http://localhost:3001`
4. Validar firmware:
   - Build e abertura do monitor serial pela extensão PlatformIO.

## 11. Troubleshooting rápido

### 11.1 `docker` não reconhecido
1. Reabrir terminal após instalação.
2. Confirmar Docker Desktop ativo.

### 11.2 `bun` não reconhecido
1. Reabrir terminal.
2. Reexecutar instalador de Bun.

### 11.3 Erro ao instalar VSIX
1. Conferir se o caminho do arquivo existe.
2. Confirmar compatibilidade da IDE com pacote VSIX.
3. Reiniciar IDE após instalação.

### 11.4 PlatformIO não aparece na IDE
1. Verificar se a extensão `platformio.platformio-ide-3.3.4-win32-x64.vsix` está habilitada.
2. Recarregar janela da IDE.
3. Reabrir pasta `ESP32Device.pio`.

## 12. Evidências mínimas de conclusão
1. Print das versões de `git`, `docker`, `node`, `bun`, `python`.
2. Print das extensões VSIX instaladas.
3. Resultado do `bun run build` no frontend.
4. Resultado do `npx hardhat test` no blockchain.
6. Print do build do firmware via PlatformIO.

## 13. Bibliografia
- Docker Docs.
- Node.js Docs.
- Bun Docs.
- Python Docs.
- VS Code Docs (Install from VSIX).
- PlatformIO IDE Docs.
