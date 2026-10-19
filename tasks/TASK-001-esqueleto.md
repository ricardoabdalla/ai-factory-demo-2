# TASK-001: Construir o esqueleto da página com cabeçalho, hero e rodapé

## Directive

**What to build:**
Monte a página do zero, de ponta a ponta: o build gera um `dist/` estático
cujo `index.html` já traz, sem JavaScript, o `<head>` da página (idioma,
título, description e o link de fontes do design system), o cabeçalho com
a marca W da Woba sobre o tile amarelo e o link "Ler o artigo original", a
seção `inicio` (overline, título e os dois parágrafos da Copy) e o rodapé
com o crédito. O build checa os tipos antes de empacotar, todos os tokens
de cor do design system e os tokens próprios da spec já estão declarados, e
a suíte de testes lê o `dist/` gerado pela seam única da spec. Instale as
seis `devDependencies` que a Architecture lista. O script do navegador
existe e só carrega as folhas de estilo.

**Risk tier:** standard

**Type:** feat

## Dependencies

- Blocked by: None

## Context

Read: `specs/cinco-niveis/spec.md`
- Blueprint → Architecture: Stack, Renderização no build, `index.html`,
  `src/content.ts`, `src/render.ts`, `src/main.ts`, `src/styles/tokens.css`,
  `src/styles/pagina.css`, Contrato do DOM (linhas Cabeçalho, Seções,
  Overline, Título, Parágrafos de seção e Rodapé), Teste, `package.json`,
  `tsconfig.json`
- Blueprint → Constraints: build e test, `base: './'`, link de fontes, URL
  do artigo, cores só por tokens, Tokens próprios, Tipografia (`h1`,
  overline, parágrafos), Layout, Fundo da página, foco em `:focus-visible`
- Blueprint → Copy: tabelas Página, Cabeçalho, Seção `inicio` e Rodapé
- Contract → Regression Guardrails
- Scenarios → S-0002 "O cabeçalho traz a marca e o link para o artigo"; S-0003 "As fontes do design system são carregadas com o link exato"; S-0014 "O rodapé credita o autor e a data do artigo"; S-0016 "A copy em pt-BR não tem exclamações nem emoji"; S-0017 "A página não tem imagens nem gradientes"; S-0019 "Os arquivos do build usam caminhos relativos"; S-0020 "As cores vêm só dos tokens"

## Not yet in force

Every Constraint, Regression Guardrail, Scenario and Architecture clause of the spec is in force when this Task merges, except:

- Architecture → `src/main.ts`, o `IntersectionObserver` que marca o nível ativo — holds now as: o script só importa as duas folhas de estilo; in force from TASK-004
- Constraints → a URL do artigo "usada nos dois links" — holds now as: o link do cabeçalho usa a URL; in force from TASK-002
- Constraints → "O amarelo `#F9E10D` aparece em exatamente dois usos" — holds now as: `#F9E10D` só no tile da marca; in force from TASK-003
- Scenarios → S-0001 "A página chega completa no HTML gerado" — holds now as: `lang`, `title` e description da Copy, exatamente um `h1`, dentro de `inicio`, e todo filho `section` de `main` tem um id da lista do Scenario, na ordem relativa dela; in force from TASK-003
- Scenarios → S-0004 "Cada seção abre com a overline e o título da Copy" — holds now as: a linha `inicio` dos Examples; in force from TASK-003
- Scenarios → S-0005 "O ponto de partida e a analogia trazem a citação original com tradução" — holds now as: a página não tem essas seções; in force from TASK-002
- Scenarios → S-0006 "Cada nível tem um card com número, metáfora, ícone e quem dirige" — holds now as: a página não tem cards; in force from TASK-003
- Scenarios → S-0007 "Cada nível diz o que você faz, o que a IA faz e cita o autor" — holds now as: a página não tem cards; in force from TASK-003
- Scenarios → S-0008 "As ressalvas aparecem dentro do nível a que pertencem" — holds now as: a página não tem cards; in force from TASK-003
- Scenarios → S-0009 "Os níveis 0, 1 e 4 não têm ressalva" — holds now as: a página não tem cards; in force from TASK-003
- Scenarios → S-0010 "Os destaques marcam os níveis 2, 3 e 4 na régua e no card" — holds now as: zero elementos com `data-campo="destaque"`; in force from TASK-004
- Scenarios → S-0011 "Só os níveis 2, 3 e 4 têm destaque" — holds now as: zero elementos com `data-campo="destaque"`; in force from TASK-004
- Scenarios → S-0012 "A régua é uma lista de âncoras que funciona sem JavaScript" — holds now as: a página não tem régua; in force from TASK-004
- Scenarios → S-0013 "O fechamento faz a pergunta aberta e leva ao artigo" — holds now as: a página não tem a seção `fechamento`; in force from TASK-002
- Scenarios → S-0015 "Cada termo em inglês vem explicado na primeira vez que aparece" — holds now as: as linhas `dark factory` e `spec` dos Examples; in force from TASK-003
- Scenarios → S-0018 "Os ícones são decorativos e herdam a cor do texto" — holds now as: `main` tem zero `svg`; in force from TASK-003
- Scenarios → S-0021 "A régua é fixa no topo e usa o vidro do design system" — holds now as: o CSS não tem regra `.regua`; in force from TASK-004
- Scenarios → S-0022 "A régua marca o nível que está sendo lido" — holds now as: a página não tem régua; in force from TASK-004
- Scenarios → S-0023 "A página cabe numa tela de 360px" — holds now as: a Constraint de `scrollWidth` igual a 360 vale, e a página não tem régua; in force from TASK-004
- Scenarios → S-0024 "A navegação por teclado mostra o foco e leva ao card" — holds now as: o link do cabeçalho mostra o anel de foco das Constraints; in force from TASK-004

## Placement

- `package-lock.json` — serves `package.json`: o lockfile que o `npm install` das `devDependencies` gera.

## Verification

- [ ] `npm run build` termina com código 0 e escreve `dist/index.html`. [command: `npm run build`]
- [ ] `npm test` termina com código 0. [command: `npm test`]
- [ ] Scenario S-0001 "A página chega completa no HTML gerado" has a test. [test]
- [ ] Scenario S-0002 "O cabeçalho traz a marca e o link para o artigo" has a test. [test]
- [ ] Scenario S-0003 "As fontes do design system são carregadas com o link exato" has a test. [test]
- [ ] Scenario S-0004 "Cada seção abre com a overline e o título da Copy" has a test. [test]
- [ ] Scenario S-0014 "O rodapé credita o autor e a data do artigo" has a test. [test]
- [ ] Scenario S-0015 "Cada termo em inglês vem explicado na primeira vez que aparece" has a test. [test]
- [ ] Scenario S-0016 "A copy em pt-BR não tem exclamações nem emoji" has a test. [test]
- [ ] Scenario S-0017 "A página não tem imagens nem gradientes" has a test. [test]
- [ ] Scenario S-0019 "Os arquivos do build usam caminhos relativos" has a test. [test]
- [ ] Scenario S-0020 "As cores vêm só dos tokens" has a test. [test]
- [ ] Cada teste lê só o `dist/` gerado, a partir de `dist/index.html`, como a Architecture → Teste define. [test]
- [ ] O cabeçalho, a seção `inicio` e o rodapé seguem o design system: a marca W preta no tile amarelo, o `h1` em Noticia Text itálico e a overline em UPPERCASE. O owner confere abrindo `dist/index.html` no navegador depois de `npm run build`. [owner]
