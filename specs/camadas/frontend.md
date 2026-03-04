# Camada - Frontend

## Descrição
Especificação da camada de interface (Next.js) para provisionamento, administração e biometria.

## Requisitos aplicaveis
- RF-001, RF-007, RF-008, RF-010, RF-011, RF-012, RF-013, RF-014
- RNF-008

## Comportamento esperado
1. `/signup` inicia provisionamento e acompanha eventos.
2. `/dashboard` permite:
   - buscar usuário
   - definir acesso
   - revogar TAG
   - validar biometria
   - acompanhar timeline
3. `/login` e `/admin/login` suportam autenticação por biometria.

## Topicos detalhados
- `frontend/README.md`
- `frontend/topicos/01-escopo-e-responsabilidades.md`
- `frontend/topicos/02-requisitos-funcionais-da-camada.md`
- `frontend/topicos/03-requisitos-nao-funcionais-da-camada.md`
- `frontend/topicos/04-fluxos-e-criterios-de-aceite.md`

## Bibliografia
- Next.js docs.
- React docs.
- UX para sistemas de segurança e operação crítica.





