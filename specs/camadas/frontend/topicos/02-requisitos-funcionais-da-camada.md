# Frontend - Requisitos Funcionais da Camada

## 1. Descrição
Lista de requisitos funcionais especificos da camada de interface.

## 2. Objetivo
- Definir o comportamento esperado da UI para operação do sistema.

## 3. Requisitos

### FR-FE-01
A interface deve iniciar provisionamento remoto e exibir status da janela.
- Aceite: ao iniciar, a tela mostra retorno com tempo de expiração.

### FR-FE-02
A interface deve permitir cadastro com biometria facial durante o fluxo de identificacao.
- Aceite: embedding capturado e enviado ao backend no cadastro.

### FR-FE-03
A interface deve permitir busca de usuário por nome, matrícula ou DID.
- Aceite: busca retorna usuário, DID e dados associados para operação.

### FR-FE-04
A interface deve permitir concessão de acesso por dispositivo com data/hora de expiração.
- Aceite: operação retorna hash de transação e status de sucesso.

### FR-FE-05
A interface deve permitir revogação de credencial de TAG no contexto do usuário selecionado.
- Aceite: operação retorna hash de transação e acesso subsequente e negado.

### FR-FE-06
A interface deve validar acesso por biometria e apresentar resultado de autorização em tempo real.
- Aceite: retorno inclui `allowed`, `tagDid`, `tagUid` e mensagem de diagnóstico.

### FR-FE-07
A interface deve exibir timeline de eventos de segurança enriquecidos com usuário e dispositivo.
- Aceite: eventos `authorized` e `denied` aparecem com contexto legivel.

### FR-FE-08
As telas de login devem suportar autenticação biométrica para usuário e administrador.
- Aceite: reconhecimento positivo autentica perfil correspondente.

## 4. Bibliografia
- React docs.
- Next.js docs.
- W3C DID Core (contexto de identidade digital).




