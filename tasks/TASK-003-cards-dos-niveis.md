# TASK-003: Renderizar a seção Os Seis Níveis com os seis cards

## Directive

**What to build:**
Acrescente a seção `niveis`, entre `analogia` e `fechamento`, com a
overline, o título e a introdução da Copy, seguida dos seis cards, do Nível
0 ao Nível 5. Todos os cards têm o mesmo formato: o número grande, a
metáfora como título, o ícone Lucide do nível como SVG inline decorativo, o
badge "Quem dirige", os dois papéis ("O que você faz" e "O que a IA faz") e
a citação do autor com tradução, no componente de citação que já existe.
Os níveis 2, 3 e 5 trazem a ressalva dentro do card, e os níveis 2, 3 e 4
trazem o destaque amarelo. Os dados dos níveis entram no arquivo de copy
como uma tupla tipada de exatamente seis níveis, de modo que o build recusa
um nível a mais, a menos ou sem algum campo obrigatório. Os cards levam o
`scroll-margin-top` das Constraints, para que um link `#nivel-N` deixe o
título visível abaixo da régua que vem na próxima Task.

**Risk tier:** standard

**Type:** feat

## Dependencies

- Blocked by: TASK-002

## Context

Read: `specs/cinco-niveis/spec.md`
- Blueprint → Architecture: `src/content.ts` (os tipos `Nivel`,
  `Citacao`, `Ressalva`, `QuemDirige`, `Icone` e a tupla de seis níveis),
  `src/render.ts` (os ícones de `lucide-static`), Contrato do DOM (linhas
  Card, Número, Metáfora, Quem dirige, Papéis, Ressalva e Destaque)
- Blueprint → Constraints: Tipografia (`h3`, número, citação de ressalva,
  badges), Fundo da página (`section#niveis`), Cards, Blocos de citação e de
  ressalva, Badge "Quem dirige", Destaques, `scroll-margin-top`
- Blueprint → Copy: tabelas Seção `niveis`, Níveis — estrutura, Níveis —
  metáfora e papéis, Níveis — citação e Níveis — ressalva
- Contract → Regression Guardrails
- Scenarios → S-0001 "A página chega completa no HTML gerado"; S-0004 "Cada seção abre com a overline e o título da Copy"; S-0006 "Cada nível tem um card com número, metáfora, ícone e quem dirige"; S-0007 "Cada nível diz o que você faz, o que a IA faz e cita o autor"; S-0008 "As ressalvas aparecem dentro do nível a que pertencem"; S-0009 "Os níveis 0, 1 e 4 não têm ressalva"; S-0015 "Cada termo em inglês vem explicado na primeira vez que aparece"; S-0018 "Os ícones são decorativos e herdam a cor do texto"

## Not yet in force

Every Constraint, Regression Guardrail, Scenario and Architecture clause of the spec is in force when this Task merges, except:

- Architecture → `src/main.ts`, o `IntersectionObserver` que marca o nível ativo — holds now as: o script só importa as duas folhas de estilo; in force from TASK-004
- Scenarios → S-0010 "Os destaques marcam os níveis 2, 3 e 4 na régua e no card" — holds now as: os articles `nivel-2`, `nivel-3` e `nivel-4` contêm exatamente um elemento com `data-campo="destaque"`, com o texto da linha do nível nos Examples; in force from TASK-004
- Scenarios → S-0011 "Só os níveis 2, 3 e 4 têm destaque" — holds now as: os articles `nivel-0`, `nivel-1` e `nivel-5` não contêm elemento com `data-campo="destaque"`, e a página tem exatamente três; in force from TASK-004
- Scenarios → S-0012 "A régua é uma lista de âncoras que funciona sem JavaScript" — holds now as: a página não tem régua; in force from TASK-004
- Scenarios → S-0021 "A régua é fixa no topo e usa o vidro do design system" — holds now as: o CSS não tem regra `.regua`; in force from TASK-004
- Scenarios → S-0022 "A régua marca o nível que está sendo lido" — holds now as: a página não tem régua; in force from TASK-004
- Scenarios → S-0023 "A página cabe numa tela de 360px" — holds now as: a Constraint de `scrollWidth` igual a 360 vale, e a página não tem régua; in force from TASK-004
- Scenarios → S-0024 "A navegação por teclado mostra o foco e leva ao card" — holds now as: os links do cabeçalho e do fechamento mostram o anel de foco das Constraints; in force from TASK-004

## Verification

- [ ] `npm run build` termina com código 0. [command: `npm run build`]
- [ ] `npm test` termina com código 0. [command: `npm test`]
- [ ] Scenario S-0006 "Cada nível tem um card com número, metáfora, ícone e quem dirige" has a test. [test]
- [ ] Scenario S-0007 "Cada nível diz o que você faz, o que a IA faz e cita o autor" has a test. [test]
- [ ] Scenario S-0008 "As ressalvas aparecem dentro do nível a que pertencem" has a test. [test]
- [ ] Scenario S-0009 "Os níveis 0, 1 e 4 não têm ressalva" has a test. [test]
- [ ] Scenario S-0018 "Os ícones são decorativos e herdam a cor do texto" has a test. [test]
- [ ] O teste de S-0001 "A página chega completa no HTML gerado" verifica os cinco filhos `section` de `main`, com os ids e a ordem do Scenario. [test]
- [ ] O teste de S-0004 "Cada seção abre com a overline e o título da Copy" roda sobre todas as linhas dos Examples. [test]
- [ ] O teste de S-0015 "Cada termo em inglês vem explicado na primeira vez que aparece" roda sobre todas as linhas dos Examples. [test]
- [ ] Os seis cards seguem as Constraints → Cards, Badge "Quem dirige" e Destaques, com o ícone de 32px em traço de 1,5px. O owner confere abrindo `dist/index.html` no navegador depois de `npm run build`. [owner]
