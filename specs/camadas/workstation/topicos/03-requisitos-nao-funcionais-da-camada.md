# Workstation - Requisitos Não Funcionais da Camada

## 1. Descrição
Define atributos de qualidade para setup e manutenção da estação de trabalho.

## 2. Objetivo
- Assegurar reprodutibilidade e estabilidade do ambiente de desenvolvimento.

## 3. Requisitos de qualidade

### NFR-WS-01 - Reprodutibilidade
O procedimento de setup deve ser executável por qualquer aluno com o mesmo resultado funcional.

### NFR-WS-02 - Rastreabilidade
Versões de ferramentas e extensões devem estar documentadas na especificação.

### NFR-WS-03 - Consistência da IDE
Todos os alunos devem usar a mesma base de extensão para reduzir divergências de fluxo.

### NFR-WS-04 - Tempo de preparo controlado
A workstation deve ficar pronta em janela compatível com aula de laboratório.

### NFR-WS-05 - Recuperabilidade
Após troca de máquina ou formatação, o setup deve ser restaurável seguindo este roteiro.

## 4. Critérios de verificação
1. Checklist de setup concluído por aluno sem assistência externa.
2. Comandos de validação retornando sucesso no mesmo ambiente.
3. Execução dos módulos sem erro de dependência ausente.

## 5. Bibliografia
- ISO/IEC 25010.
- Twelve-Factor App (dev/prod parity).
