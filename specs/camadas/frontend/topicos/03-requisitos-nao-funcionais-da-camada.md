# Frontend - Requisitos Não Funcionais da Camada

## 1. Descrição
Define os requisitos de qualidade para a camada de interface.

## 2. Objetivo
- Garantir usabilidade, robustez e clareza operacional nas telas.

## 3. Requisitos de qualidade

### NFR-FE-01 - Usabilidade operacional
Fluxos de cadastro, concessão, revogação e validação devem ser executáveis sem script manual.

### NFR-FE-02 - Clareza de feedback
Cada ação crítica deve retornar status visível de sucesso, erro ou negação.

### NFR-FE-03 - Tolerância a falha de dispositivos
A camada deve tratar falhas de câmera/permissão e oferecer mensagem de recuperação.

### NFR-FE-04 - Consistência visual
Componentes de resposta operacional (timeline, toast, modal) devem manter padrão único.

### NFR-FE-05 - Responsividade
As telas devem operar em desktop e mobile sem perda de funções principais.

### NFR-FE-06 - Segurança de interface
Dados sensíveis não devem ficar expostos de forma desnecessária na UI.

## 4. Critérios de verificação
1. Operações principais executadas pela interface em fluxo completo.
2. Erros de câmera/API apresentados com mensagem acionável.
3. Eventos de segurança legíveis e sem truncamento de feedback.
4. Navegação e formulários funcionais em viewport reduzida.

## 5. Bibliografia
- ISO/IEC 25010 (qualidade de software).
- Nielsen Norman Group (heurísticas de usabilidade).
- OWASP ASVS (controles de interface e segurança aplicada).






