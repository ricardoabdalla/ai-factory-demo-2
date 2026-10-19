# TASK-004: Adicionar a régua de níveis e marcar o nível ativo

## Directive

**What to build:**
Acrescente a régua no começo da seção `niveis`, depois do título e da
introdução e antes do primeiro card: uma lista ordenada de seis links, de
"Nível 0" a "Nível 5", cada um apontando para o card do nível. Os links
dos níveis 2, 3 e 4 trazem o destaque amarelo do nível. Sem JavaScript, a
régua já funciona como lista de âncoras. A régua gruda no topo enquanto a
seção está na tela, com o vidro do design system, e rola na horizontal
dentro de si mesma quando os seis links não cabem. No navegador, o script
marca com `aria-current="true"` o link do nível cujo card está sendo lido,
com a transição de cor das Constraints e sem transição quando a pessoa
pede movimento reduzido. Esta Task fecha o contrato da página e inclui as
conferências manuais da spec.

**Risk tier:** standard

**Type:** feat

## Dependencies

- Blocked by: TASK-003

## Context

Read: `specs/cinco-niveis/spec.md`
- Blueprint → Architecture: `src/main.ts` (o `IntersectionObserver` e o
  `aria-current`), Contrato do DOM (linhas Régua e Destaque)
- Blueprint → Constraints: Régua, `scroll-margin-top`, viewport de 360px,
  foco em `:focus-visible`, movimento
- Blueprint → Copy: tabela Seção `niveis` (rótulo do link da régua) e
  Níveis — estrutura (`destaque`)
- Contract → Definition of Done (as conferências manuais e o `dist/` num
  subcaminho)
- Scenarios → S-0010 "Os destaques marcam os níveis 2, 3 e 4 na régua e no card"; S-0011 "Só os níveis 2, 3 e 4 têm destaque"; S-0012 "A régua é uma lista de âncoras que funciona sem JavaScript"; S-0021 "A régua é fixa no topo e usa o vidro do design system"; S-0022 "A régua marca o nível que está sendo lido"; S-0023 "A página cabe numa tela de 360px"; S-0024 "A navegação por teclado mostra o foco e leva ao card"

## Verification

- [ ] `npm run build` termina com código 0. [command: `npm run build`]
- [ ] `npm test` termina com código 0. [command: `npm test`]
- [ ] Scenario S-0010 "Os destaques marcam os níveis 2, 3 e 4 na régua e no card" has a test. [test]
- [ ] Scenario S-0011 "Só os níveis 2, 3 e 4 têm destaque" has a test. [test]
- [ ] Scenario S-0012 "A régua é uma lista de âncoras que funciona sem JavaScript" has a test. [test]
- [ ] Scenario S-0021 "A régua é fixa no topo e usa o vidro do design system" has a test. [test]
- [ ] Scenario S-0022 "A régua marca o nível que está sendo lido" passa na conferência manual: o owner abre a página num navegador e segue os passos do Scenario, com `prefers-reduced-motion` ligado e desligado. [owner]
- [ ] Scenario S-0023 "A página cabe numa tela de 360px" passa na conferência manual: o owner segue os passos do Scenario no modo de dispositivo do navegador, a 360px de largura. [owner]
- [ ] Scenario S-0024 "A navegação por teclado mostra o foco e leva ao card" passa na conferência manual: o owner segue os passos do Scenario só com o teclado. [owner]
- [ ] O `dist/` gerado por `npm run build`, servido a partir de um subcaminho de um servidor estático, carrega o CSS e o JavaScript. O owner confere no navegador. [owner]
