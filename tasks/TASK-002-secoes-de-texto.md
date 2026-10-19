# TASK-002: Adicionar as seções Ponto de Partida, Analogia e Fechamento

## Directive

**What to build:**
Acrescente à página as três seções de texto, cada uma com a overline, o
título e os parágrafos da Copy: `ponto-de-partida` e `analogia`, na ordem da
spec depois de `inicio`, e `fechamento`, por último em `main`. As duas
primeiras terminam com a citação do autor no original em inglês e a
tradução logo abaixo, no bloco sand do design system. O fechamento faz a
pergunta aberta e leva ao artigo original pelo mesmo link do cabeçalho. A
citação é um componente de renderização reutilizável, que os cards dos
níveis vão usar depois.

**Risk tier:** standard

**Type:** feat

## Dependencies

- Blocked by: TASK-001

## Context

Read: `specs/cinco-niveis/spec.md`
- Blueprint → Architecture: `src/content.ts`, `src/render.ts`, Contrato do
  DOM (linhas Seções, Overline, Título, Parágrafos de seção, Citação e
  Pergunta)
- Blueprint → Constraints: URL do artigo, Tipografia (`h2`, citação
  original, tradução), Blocos de citação e de ressalva, `lang="en"` nas
  frases originais
- Blueprint → Copy: tabelas Seção `ponto-de-partida`, Seção `analogia` e
  Seção `fechamento`
- Contract → Regression Guardrails
- Scenarios → S-0005 "O ponto de partida e a analogia trazem a citação original com tradução"; S-0013 "O fechamento faz a pergunta aberta e leva ao artigo"

## Not yet in force

Every Constraint, Regression Guardrail, Scenario and Architecture clause of the spec is in force when this Task merges, except:

- Architecture → `src/main.ts`, o `IntersectionObserver` que marca o nível ativo — holds now as: o script só importa as duas folhas de estilo; in force from TASK-004
- Constraints → "O amarelo `#F9E10D` aparece em exatamente dois usos" — holds now as: `#F9E10D` só no tile da marca; in force from TASK-003
- Scenarios → S-0001 "A página chega completa no HTML gerado" — holds now as: `main` tem os filhos `section` `inicio`, `ponto-de-partida`, `analogia` e `fechamento`, nessa ordem, e cada seção depois de `inicio` tem exatamente um `h2`; in force from TASK-003
- Scenarios → S-0004 "Cada seção abre com a overline e o título da Copy" — holds now as: as linhas `inicio`, `ponto-de-partida`, `analogia` e `fechamento` dos Examples; in force from TASK-003
- Scenarios → S-0006 "Cada nível tem um card com número, metáfora, ícone e quem dirige" — holds now as: a página não tem cards; in force from TASK-003
- Scenarios → S-0007 "Cada nível diz o que você faz, o que a IA faz e cita o autor" — holds now as: a página não tem cards; in force from TASK-003
- Scenarios → S-0008 "As ressalvas aparecem dentro do nível a que pertencem" — holds now as: a página não tem cards; in force from TASK-003
- Scenarios → S-0009 "Os níveis 0, 1 e 4 não têm ressalva" — holds now as: a página não tem cards; in force from TASK-003
- Scenarios → S-0010 "Os destaques marcam os níveis 2, 3 e 4 na régua e no card" — holds now as: zero elementos com `data-campo="destaque"`; in force from TASK-004
- Scenarios → S-0011 "Só os níveis 2, 3 e 4 têm destaque" — holds now as: zero elementos com `data-campo="destaque"`; in force from TASK-004
- Scenarios → S-0012 "A régua é uma lista de âncoras que funciona sem JavaScript" — holds now as: a página não tem régua; in force from TASK-004
- Scenarios → S-0015 "Cada termo em inglês vem explicado na primeira vez que aparece" — holds now as: as linhas `dark factory`, `spec`, `technical deflation` e `NHTSA` dos Examples; in force from TASK-003
- Scenarios → S-0018 "Os ícones são decorativos e herdam a cor do texto" — holds now as: `main` tem zero `svg`; in force from TASK-003
- Scenarios → S-0021 "A régua é fixa no topo e usa o vidro do design system" — holds now as: o CSS não tem regra `.regua`; in force from TASK-004
- Scenarios → S-0022 "A régua marca o nível que está sendo lido" — holds now as: a página não tem régua; in force from TASK-004
- Scenarios → S-0023 "A página cabe numa tela de 360px" — holds now as: a Constraint de `scrollWidth` igual a 360 vale, e a página não tem régua; in force from TASK-004
- Scenarios → S-0024 "A navegação por teclado mostra o foco e leva ao card" — holds now as: os links do cabeçalho e do fechamento mostram o anel de foco das Constraints; in force from TASK-004

## Verification

- [ ] `npm run build` termina com código 0. [command: `npm run build`]
- [ ] `npm test` termina com código 0. [command: `npm test`]
- [ ] Scenario S-0005 "O ponto de partida e a analogia trazem a citação original com tradução" has a test. [test]
- [ ] Scenario S-0013 "O fechamento faz a pergunta aberta e leva ao artigo" has a test. [test]
- [ ] Os blocos de citação seguem as Constraints → Blocos de citação e de ressalva e Tipografia: fundo sand, original em Noticia Text itálico e tradução em caption cinza. O owner confere abrindo `dist/index.html` no navegador depois de `npm run build`. [owner]
