# Spec: Os Cinco Níveis de Dan Shapiro

## Problem Statement

O time da Woba (engenharia, produto, design e liderança) fala de "usar IA
para programar" sem um vocabulário comum. Uma pessoa diz que o time "já
trabalha com agentes", outra entende autocomplete, e a conversa não avança
porque ninguém sabe de que ponto o outro está falando. Dan Shapiro publicou
uma escala que resolve exatamente isso, mas ela está num artigo em inglês,
longo, escrito para engenheiros, e parte do time não vai lê-lo inteiro.

## Solution

Uma página única, em pt-BR, no visual do design system da Woba, que explica
a escala de Shapiro com fidelidade: o ponto de partida (a deflação técnica),
a analogia com os níveis de direção autônoma e os seis níveis, do 0 ao 5.
Cada nível aparece num card com o mesmo formato (metáfora do carro, quem
dirige, o que você faz, o que a IA faz e a frase do autor no original em
inglês com tradução), e uma régua fixa no topo mostra os seis níveis lado a
lado e leva a cada card. A página atribui tudo ao autor, não diz nada sobre
a Woba e termina com uma pergunta aberta: "Em que nível você trabalha hoje?".

## User Stories

1. Como pessoa de engenharia da Woba, quero ver os seis níveis lado a lado
   numa régua, para localizar em segundos em que nível eu trabalho.
2. Como pessoa de produto, quero que cada nível diga o que o humano faz e o
   que a IA faz, para comparar níveis sem precisar entender o código.
3. Como pessoa de design, quero que a página siga o design system da Woba,
   para reconhecer nela um material interno e confiável.
4. Como liderança, quero uma explicação neutra e atribuída ao autor, para
   discutir a escala com o time sem que a página pareça uma posição oficial
   da Woba.
5. Como leitor sem formação técnica, quero que cada termo em inglês (spec,
   diff, dark factory e outros) venha com uma explicação curta na primeira
   vez que aparece, para acompanhar o texto sem pesquisar fora.
6. Como leitor que quer conferir a fonte, quero ler a frase original em
   inglês ao lado da tradução, para julgar se a tradução é fiel.
7. Como leitor, quero um link para o artigo original no cabeçalho e no
   fechamento, para ler o texto completo quando quiser.
8. Como leitor, quero entender por que a escala tem "cinco níveis" e seis
   degraus, para não achar que a página errou a conta.
9. Como leitor, quero saber que os rótulos dos níveis são metáforas de carro
   do próprio autor, para não tomá-los como nomes oficiais.
10. Como leitor, quero saber que "90% estão aqui" é uma observação do autor
    em dezenas de empresas, para não tomar o número como dado medido.
11. Como leitor, quero ver marcado onde o autor diz que a maioria das
    pessoas está (Nível 2), onde quase todo mundo para (Nível 3) e onde ele
    mesmo está (Nível 4), para entender a distribuição que ele descreve.
12. Como leitor, quero ver as ressalvas do autor dentro do nível a que cada
    uma pertence (2, 3 e 5), para lê-las no contexto certo.
13. Como leitor, quero que a régua marque o nível que estou lendo enquanto
    rolo a página, para saber onde estou na escala.
14. Como leitor, quero clicar num nível da régua e ir direto ao card dele,
    com o título visível abaixo da régua, para pular para o nível que me
    interessa.
15. Como leitor com JavaScript desligado, quero que a régua funcione como
    lista de links e que todo o texto apareça, para ler a página inteira.
16. Como leitor no celular, quero ler a página numa tela de 360px sem
    rolagem horizontal, para ler no caminho para o escritório.
17. Como pessoa que navega pelo teclado, quero ver o anel de foco em cada
    link, para saber onde estou.
18. Como pessoa que usa leitor de tela, quero que os ícones sejam ignorados
    e que o texto carregue o sentido, para ouvir só o conteúdo.
19. Como pessoa que usa leitor de tela, quero que as frases em inglês sejam
    marcadas como inglês, para ouvi-las com a pronúncia certa.
20. Como pessoa sensível a movimento, quero que a régua mude de nível sem
    animação quando eu peço movimento reduzido, para ler com conforto.
21. Como leitor, quero terminar a página com uma pergunta aberta, para
    levar a conversa para o meu time.
22. Como leitor, quero ver no rodapé o crédito ao autor e a data do artigo,
    para saber de quando é a escala.
23. Como pessoa que publica a página, quero um `dist/` estático que funcione
    em qualquer subcaminho, para hospedá-lo onde for mais simples.
24. Como pessoa que revisa a copy, quero todos os textos num único arquivo
    de dados, para revisar e corrigir a copy sem tocar no HTML.
25. Como pessoa que mantém a página, quero que o build falhe se um nível
    ficar sem algum campo, para nunca publicar um card incompleto.

## Blueprint

### Architecture

- **Stack:** Vite + TypeScript, sem framework de UI. Os tokens do design
  system entram como CSS próprio (Opção 2 de
  `docs/Woba Design System - ui reference.md`), sem o pacote
  `@woba/ds-tokens`. Tema claro apenas.
- **Renderização no build:** um plugin do Vite declarado em `vite.config.ts`
  usa o hook `transformIndexHtml` para trocar o marcador `<!--pagina-->` do
  `index.html` pelo HTML que `renderPagina(conteudo)` devolve. O HTML de
  `dist/index.html` sai completo do build; o JavaScript do navegador só
  marca o nível ativo da régua.
- **`index.html`:** a casca da página. Contém `<html lang="pt-BR">`,
  `<meta charset="utf-8">`, `<meta name="viewport">`, o `<title>` e a
  `<meta name="description">` da Copy, o `<link>` de fontes do design system,
  o marcador `<!--pagina-->` dentro de `<body>` e
  `<script type="module" src="/src/main.ts">`.
- **`src/content.ts`:** o único arquivo com copy da página. Exporta
  `conteudo: Conteudo` e os tipos abaixo. `Conteudo` tipa, como campos
  obrigatórios, todos os campos de cada seção que a página renderiza; uma
  seção entra no tipo na mesma entrega que a renderiza. A partir da entrega
  que renderiza os níveis, `niveis.itens` é uma tupla de exatamente seis
  `Nivel`, de modo que `tsc` recusa um nível a mais, a menos ou sem algum
  campo obrigatório:

  ```ts
  export interface Citacao { original: string; traducao: string }
  export interface Ressalva extends Citacao { contexto: string }
  export type QuemDirige = 'Você' | 'Você + IA' | 'IA, com você revisando' | 'IA'
  export type Icone = 'keyboard' | 'gauge' | 'car' | 'eye' | 'clipboard-list' | 'factory'
  export interface Nivel {
    numero: 0 | 1 | 2 | 3 | 4 | 5
    metafora: string
    icone: Icone
    quemDirige: QuemDirige
    humano: string
    ia: string
    citacao: Citacao
    ressalva?: Ressalva
    destaque?: string
  }
  ```

  Os tipos das seções (`hero`, `pontoDePartida`, `analogia`, `niveis`,
  `fechamento`), do cabeçalho e do rodapé têm um campo por linha da tabela
  da seção correspondente em **Copy**.
- **`src/render.ts`:** `renderPagina(c: Conteudo): string`, uma função pura
  que roda no Node durante o build. Ela escapa para HTML todo texto vindo de
  `conteudo` e insere os ícones como SVG inline a partir das strings do
  pacote `lucide-static`, com `width="32"`, `height="32"`,
  `stroke="currentColor"`, `stroke-width="1.5"`, `aria-hidden="true"` e a
  classe `lucide-<icone>`.
- **`src/main.ts`:** o único script do navegador. Importa
  `src/styles/tokens.css` e `src/styles/pagina.css` e usa um
  `IntersectionObserver` sobre os `article` dos níveis para pôr
  `aria-current="true"` no link da régua do nível visível e tirá-lo dos
  outros cinco.
- **`src/styles/tokens.css`:** um único bloco `:root` com as variáveis
  `--woba-*` da Opção 2 do design system, mais as da tabela **Tokens
  próprios** em Constraints.
- **`src/styles/pagina.css`:** os estilos da página. Todo valor de cor vem
  de `var(--woba-*)`.
- **Contrato do DOM** (o que `renderPagina` gera e os testes leem). Cada
  linha vale a partir da entrega que renderiza o elemento que ela descreve:

  | Elemento | Marcação |
  | --- | --- |
  | Cabeçalho | `header`, antes de `main`; a marca é um elemento com `data-campo="marca"` com o SVG W da Woba (`aria-label="Woba"`); o link para o artigo tem `data-campo="link-artigo"` |
  | Seções | cinco `section`, filhas diretas de `main`, com os ids `inicio`, `ponto-de-partida`, `analogia`, `niveis` e `fechamento`, nessa ordem |
  | Overline | `p` com `data-campo="overline"`, primeiro filho de cada seção |
  | Título | `h1` em `inicio`; um `h2` em cada uma das outras quatro seções |
  | Parágrafos de seção | `p` com `data-campo="paragrafo"` |
  | Citação | `figure` com `data-campo="citacao"`, contendo `blockquote lang="en"` com o original e `figcaption` com a tradução |
  | Régua | `nav` com `class="regua"` e `aria-label="Níveis"`, primeiro elemento de `section#niveis` depois do título e da introdução, com um `ol` de seis `li`, cada um com um `a href="#nivel-N"` |
  | Card | `article` com `id="nivel-N"`, de N = 0 a 5, depois da régua |
  | Número | `p` com `data-campo="numero"`, texto igual a N |
  | Metáfora | `h3` do card |
  | Quem dirige | elemento com `data-campo="quem-dirige"` |
  | Papéis | `dl` com dois pares `dt`/`dd`: `dt` "O que você faz" e `dd data-campo="humano"`; `dt` "O que a IA faz" e `dd data-campo="ia"` |
  | Ressalva | `aside` com `data-campo="ressalva"`, contendo um `p data-campo="overline"` com "RESSALVA", um `p data-campo="contexto"` e uma `figure data-campo="citacao"` |
  | Destaque | elemento com `data-campo="destaque"`, dentro do link da régua e dentro do card |
  | Pergunta | `p` com `data-campo="pergunta"` em `fechamento` |
  | Rodapé | `footer`, depois de `main`, com `p data-campo="credito"` |

- **Teste:** uma única seam, o `dist/` gerado pelo build, acessado a partir
  de `dist/index.html`. `tests/pagina.test.ts` lê `dist/index.html` do disco
  com `node:fs`, monta o DOM com `parseHTML` do `linkedom` e pode seguir o
  `<link rel="stylesheet">` desse HTML para ler o CSS gerado em `dist/`. Os
  testes não importam nada de `src/` e não abrem navegador. Os valores
  esperados vêm desta spec: os testes repetem literalmente os textos da
  **Copy**, a URL do artigo e o `<link>` de fontes.
- **`package.json`:** `"build": "tsc --noEmit && vite build"` e
  `"test": "npm run build && vitest run"`. `dependencies` fica vazio.
  `devDependencies`: `vite`, `typescript`, `vitest`, `linkedom`,
  `lucide-static` e `@types/node`.
- **`tsconfig.json`:** `strict: true`, cobrindo `src/`, `tests/` e
  `vite.config.ts`.
- **Dependências:** a página depende só do Google Fonts em tempo de
  execução. Nada depende desta página.

### Constraints

- `npm run build` roda `tsc --noEmit` e, se ele passar, `vite build`, que
  escreve `dist/index.html`. `npm test` roda `npm run build` e, em seguida,
  `vitest run`.
- `vite.config.ts` define `base: './'`: todo `src` e todo `href` de
  `dist/index.html` que aponta para um arquivo de `dist/` começa com `./`.
- O `<head>` carrega as fontes com este `<link>`, idêntico ao do design
  system:
  `<link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300..800&family=Manrope:wght@200..800&family=Noticia+Text:ital,wght@1,700&display=swap" rel="stylesheet">`.
- A URL do artigo, usada nos dois links "Ler o artigo original", é
  `https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/`.
- Toda cor do CSS gerado é declarada uma única vez como variável `--woba-*`
  num bloco `:root` e usada por `var()`. Fora dos blocos `:root`, o CSS
  gerado tem zero literais de cor (`#` seguido de 3, 4, 6 ou 8 dígitos
  hexadecimais, `rgb(` ou `rgba(`).
- Tokens próprios, somados aos da Opção 2 em `src/styles/tokens.css`:

  | Variável | Valor | Uso |
  | --- | --- | --- |
  | `--woba-color-surface-glass` | `rgba(255,255,255,0.64)` | fundo da régua |
  | `--woba-color-content-feedback-neutral` | `#4A3E1C` | texto do badge "Quem dirige" |

- Tipografia: `h1` em Noticia Text 700 itálico, 48/52px a partir de 600px de
  viewport e 32/36px abaixo disso; `h2` em Host Grotesk 600, 32/36px; `h3`
  em Host Grotesk 600, 24/28px; overlines em Manrope 600, 12/12px, +1px de
  tracking, UPPERCASE; parágrafos em Manrope 500, 16/24px; o número do card
  em Manrope 700, 32/32px; a citação original de seção ou de card em Noticia
  Text 700 itálico, 24/28px; a citação original de ressalva em Noticia Text
  700 itálico, 20/24px; a tradução em Manrope 500, 14/20px, em
  `rgba(0,0,0,0.64)`; badges em Manrope 700, 12/12px.
- Layout: o contêiner de conteúdo tem 16px de margem lateral abaixo de 600px
  de viewport, 32px de 600px a 1023px e, a partir de 1024px, largura máxima
  de 1216px, centralizado. As grades usam 4, 8 e 12 colunas nessas três
  faixas, com 16px, 32px e 32px de gutter.
- Fundo da página: `#FFFFFF`; `section#niveis` usa `#FAFAFA`.
- Cards: fundo `#FFFFFF`, borda `1px solid rgba(0,0,0,0.08)`, raio de 24px,
  padding de 24px. Os dois pares de papéis ficam em uma coluna abaixo de
  600px e em duas colunas a partir de 600px.
- Blocos de citação e de ressalva: fundo `#F6F2E7`, raio de 24px, padding
  de 24px.
- Badge "Quem dirige": fundo `#F2EDDE`, texto `#4A3E1C`, raio de 4px,
  padding 4px/8px, altura mínima de 24px.
- Destaques: fundo `#F9E10D`, texto `#272302`, raio de 4px. O amarelo
  `#F9E10D` aparece em exatamente dois usos: o tile da marca no cabeçalho e
  os destaques.
- Régua: `position: sticky`, `top: 0`, altura de 64px, fundo
  `var(--woba-color-surface-glass)`, `backdrop-filter: blur(4px)`. Os links
  são pílulas (raio de 999px) de 40px de altura. O link com
  `aria-current="true"` tem fundo `#000000` e texto `#FFFFFF`. A mudança de
  `background-color` e `color` dura 200ms com `cubic-bezier(0.2, 0, 0, 1)`
  e dura 0ms sob `prefers-reduced-motion: reduce`. Quando os seis links
  passam da largura da viewport, a rolagem horizontal acontece dentro da
  régua.
- Cada `article` de nível tem `scroll-margin-top: 80px`, a altura da régua
  mais 16px.
- Em viewport de 360px de largura, `document.documentElement.scrollWidth`
  vale 360.
- Todo `a` e todo elemento focável mostram, em `:focus-visible`,
  `box-shadow: 0 0 0 1px #FFFFFF, 0 0 0 3px #000000`.
- Os únicos movimentos da página são as transições de cor da régua.
- Toda frase original em inglês fica num elemento com `lang="en"`.

### Copy

Os textos abaixo são a fonte da verdade da copy: `src/content.ts` os
transcreve literalmente, e os testes os repetem como valores esperados. As
aspas tipográficas e as reticências (`…`, um caractere) fazem parte dos
textos.

**Página**

| Campo | Texto |
| --- | --- |
| `title` | Os Cinco Níveis de Dan Shapiro |
| `description` | Um resumo em português da escala de Dan Shapiro sobre quanto do trabalho de software já passou para a IA, do Nível 0 ao Nível 5. |

**Cabeçalho**

| Campo | Texto |
| --- | --- |
| Link do artigo | Ler o artigo original |

**Seção `inicio`**

| Campo | Texto |
| --- | --- |
| Overline | OS CINCO NÍVEIS DE DAN SHAPIRO |
| Título | Do autocomplete turbinado à dark factory |
| Parágrafo 1 | Dan Shapiro propôs uma escala para descrever quanto do trabalho de programação já passou para a IA. Ela vai do Nível 0, em que você digita cada linha, ao Nível 5, a dark factory: uma fábrica que funciona sem pessoas no processo e transforma specs, as especificações escritas do que o software deve fazer, em software. |
| Parágrafo 2 | Esta página resume a escala para dar um vocabulário comum a quem trabalha com engenharia, produto, design e liderança: dizer “estamos no Nível 3” e todo mundo entender a mesma coisa. |

**Seção `ponto-de-partida`**

| Campo | Texto |
| --- | --- |
| Overline | O PONTO DE PARTIDA |
| Título | O Código Ficou Barato |
| Parágrafo 1 | Segundo Shapiro, o custo de escrever código está caindo rápido. Ele chama isso de technical deflation, a deflação técnica: cada linha exige menos esforço do que exigia antes. Para ele, quem usa IA só em tarefas pontuais não aproveita essa queda. |
| Citação, original | … isn't really getting the benefits of deflation. You're just typing faster. |
| Citação, tradução | … não está aproveitando de verdade a deflação. Você só está digitando mais rápido. |

**Seção `analogia`**

| Campo | Texto |
| --- | --- |
| Overline | A ANALOGIA |
| Título | Uma Escala Emprestada dos Carros |
| Parágrafo 1 | Em 2013, a NHTSA, a agência de segurança no trânsito dos Estados Unidos, publicou uma escala de níveis de direção autônoma. Segundo Shapiro, ela deu ao setor um vocabulário para dizer onde a tecnologia estava e para onde ia. Ele adapta essa escala ao desenvolvimento de software e associa cada nível a um carro. |
| Citação, original | … a common language for both where things were, and where things were going |
| Citação, tradução | … uma linguagem comum tanto para onde as coisas estavam quanto para onde estavam indo |

**Seção `niveis`**

| Campo | Texto |
| --- | --- |
| Overline | A ESCALA |
| Título | Os Seis Níveis |
| Parágrafo 1 | O artigo se chama “The Five Levels”, mas a escala começa no Nível 0, então são seis degraus. O artigo não dá nomes formais aos níveis: os títulos abaixo são as metáforas de carro que o próprio Shapiro usa. Quando ele diz em que nível as pessoas estão, fala do que observou em dezenas de empresas, não de dados medidos. |
| Rótulo do link da régua | Nível N, com N de 0 a 5 |
| Rótulo do papel humano | O que você faz |
| Rótulo do papel da IA | O que a IA faz |
| Overline da ressalva | RESSALVA |
| Prefixo do badge | Quem dirige: |

**Níveis — estrutura**

| N | `icone` | `quemDirige` | `destaque` |
| --- | --- | --- | --- |
| 0 | `keyboard` | Você | — |
| 1 | `gauge` | Você | — |
| 2 | `car` | Você + IA | 90% estão aqui |
| 3 | `eye` | IA, com você revisando | Quase todo mundo para aqui |
| 4 | `clipboard-list` | IA | O Shapiro está aqui |
| 5 | `factory` | IA | — |

**Níveis — metáfora e papéis**

| N | `metafora` | `humano` | `ia` |
| --- | --- | --- | --- |
| 0 | O Volvo dos seus pais, talvez com câmbio automático | Você escreve todo o código. Segundo Shapiro, nenhum caractere chega ao disco sem a sua aprovação. | Funciona como um buscador turbinado e, de vez em quando, sugere um trecho que você aceita com a tecla Tab. |
| 1 | Assistente de faixa e controle de cruzeiro | Você continua escrevendo o código que importa e delega tarefas pontuais a um estagiário de IA, como escrever um teste para uma função ou documentar um trecho. | Executa cada tarefa pontual que você pede, uma de cada vez. |
| 2 | O Autopilot na estrada | Você programa em par com a IA, como faria com um colega, e entra em flow, o estado de concentração contínua em que o trabalho avança sem interrupções. | Atua como um colaborador júnior, que acompanha você durante todo o trabalho. |
| 3 | Um Waymo com motorista de segurança | Você vira gerente e passa a ser o human in the loop, a pessoa que aprova cada passo. Mantém várias abas de agentes abertas, cada uma com uma IA trabalhando numa tarefa, e revisa diffs, a comparação entre a versão antiga e a nova do código. | Assume o papel do desenvolvedor sênior e escreve o código que você revisa. |
| 4 | Um robotáxi | Você vira PM, a pessoa responsável pelo produto. Escreve specs, discute as specs com a IA, cria skills, instruções reutilizáveis que ensinam a IA a fazer uma tarefa, e revisa planos. Depois sai por 12 horas e, na volta, confere se os testes passaram. | Executa a spec sozinha, em longas sessões sem supervisão. |
| 5 | Uma caixa-preta, como a dark factory da Fanuc | Você fica fora do ciclo de desenvolvimento. Shapiro explica o nome dark factory, a fábrica às escuras: é um lugar onde pessoas não são necessárias nem bem-vindas. | Conduz o processo inteiro, da spec ao software. |

**Níveis — citação**

| N | `citacao.original` | `citacao.traducao` |
| --- | --- | --- |
| 0 | … the code is unmistakably yours. This is manual labor in a deflationary world. | … o código é inconfundivelmente seu. É trabalho braçal num mundo em deflação. |
| 1 | … your job is unchanged. You're still moving at the rate you type. | … o seu trabalho não mudou. Você ainda avança no ritmo em que digita. |
| 2 | This is where 90% of 'AI-native' developers are living right now. | É aqui que vivem hoje 90% dos desenvolvedores que se dizem AI-native, nativos em IA. |
| 3 | Your life is diffs. | A sua vida são diffs. |
| 4 | You've now become that which you loathed. | Agora você se tornou aquilo que detestava. |
| 5 | It's a black box that turns specs into software. | É uma caixa-preta que transforma specs em software. |

**Níveis — ressalva**

| N | `ressalva.contexto` | `ressalva.original` | `ressalva.traducao` |
| --- | --- | --- | --- |
| 2 | Shapiro alerta que a sensação de ter terminado engana: | … level 2, and every level after it, feels like you are done. But you are not done. | … o nível 2, e cada nível depois dele, dá a sensação de que você terminou. Mas você não terminou. |
| 3 | Segundo Shapiro, este nível costuma parecer um retrocesso, e é nele que a maioria fica: | For many people, this feels like things got worse. … And almost everyone tops out here. | Para muita gente, parece que as coisas pioraram. … E quase todo mundo para aqui. |
| 5 | Shapiro diz conhecer poucas pessoas trabalhando assim, todas em times pequenos: | a handful of people … small teams, less than five people | um punhado de pessoas … times pequenos, com menos de cinco pessoas |

**Seção `fechamento`**

| Campo | Texto |
| --- | --- |
| Overline | PARA CONVERSAR |
| Título | Agora É com Você |
| Pergunta | Em que nível você trabalha hoje? |
| Parágrafo 1 | A escala não dá nota a ninguém. Ela serve para dar nome ao jeito como você e o seu time trabalham hoje, com as palavras do próprio Shapiro. |
| Link do artigo | Ler o artigo original |

**Rodapé**

| Campo | Texto |
| --- | --- |
| Crédito | Baseado em “The Five Levels: from Spicy Autocomplete to the Dark Factory”, de Dan Shapiro, publicado em 23/01/2026. |

## Contract

### Definition of Done

- [ ] `npm run build` termina com código 0 e escreve `dist/index.html`.
- [ ] `npm test` termina com código 0, e cada Scenario sem a tag `@manual`
      tem um teste em `tests/pagina.test.ts` que cita o ID dele.
- [ ] Os Scenarios `@manual` foram conferidos por uma pessoa num navegador,
      e o resultado está registrado na descrição do merge.
- [ ] `dist/` aberto a partir de um subcaminho qualquer de um servidor
      estático carrega o CSS e o JavaScript.
- [ ] Spec updated in the same merge as any behaviour change.

### Regression Guardrails

- Toda copy visível da página vem de `src/content.ts`; `src/render.ts` e
  `index.html` só têm marcação. Conferido em revisão de código, porque os
  testes não leem `src/`.
- O conteúdo de `main` está inteiro em `dist/index.html`, sem depender de
  JavaScript.
- Toda frase do autor aparece no original em inglês, com `lang="en"`,
  seguida da tradução em pt-BR.
- Toda afirmação sobre a escala é atribuída a Shapiro; a página não faz
  afirmações sobre a Woba.
- Os seis níveis mantêm o mesmo formato de card: número, metáfora, ícone,
  quem dirige, os dois papéis e a citação.
- A página tem zero imagens raster, gradientes, emoji e exclamações na copy
  pt-BR.

### Scenarios

```gherkin
@S-0001
Scenario: A página chega completa no HTML gerado
  Given o build concluído
  When dist/index.html é lido sem executar JavaScript
  Then o elemento html tem lang "pt-BR"
  And o title é "Os Cinco Níveis de Dan Shapiro"
  And a meta description é o texto "description" da tabela "Página" da Copy
  And main tem exatamente cinco filhos section, com os ids "inicio", "ponto-de-partida", "analogia", "niveis" e "fechamento", nessa ordem
  And a página tem exatamente um h1, dentro de "inicio"
  And cada uma das outras quatro seções tem exatamente um h2

@S-0002
Scenario: O cabeçalho traz a marca e o link para o artigo
  Given o build concluído
  When o header que vem antes de main é lido
  Then ele contém um elemento com data-campo "marca" que contém um svg com aria-label "Woba"
  And ele contém um link com data-campo "link-artigo", texto "Ler o artigo original" e href igual à URL do artigo das Constraints

@S-0003
Scenario: As fontes do design system são carregadas com o link exato
  Given o build concluído
  When o head de dist/index.html é lido
  Then ele contém um link rel "stylesheet" com href igual ao do link de fontes das Constraints

@S-0004
Scenario Outline: Cada seção abre com a overline e o título da Copy
  Given o build concluído
  When a seção "<id>" é lida
  Then o primeiro filho dela é um p com data-campo "overline" e texto "<overline>"
  And o título dela, h1 em "inicio" e h2 nas outras, tem o texto "<titulo>"
  And os p com data-campo "paragrafo" da seção têm, em ordem, os textos dos parágrafos da tabela da seção "<id>" na Copy

  Examples:
    | id               | overline                       | titulo                                   |
    | inicio           | OS CINCO NÍVEIS DE DAN SHAPIRO | Do autocomplete turbinado à dark factory |
    | ponto-de-partida | O PONTO DE PARTIDA             | O Código Ficou Barato                    |
    | analogia         | A ANALOGIA                     | Uma Escala Emprestada dos Carros         |
    | niveis           | A ESCALA                       | Os Seis Níveis                           |
    | fechamento       | PARA CONVERSAR                 | Agora É com Você                         |

@S-0005
Scenario Outline: O ponto de partida e a analogia trazem a citação original com tradução
  Given o build concluído
  When a seção "<id>" é lida
  Then ela contém exatamente uma figure com data-campo "citacao"
  And o blockquote dela tem lang "en" e o texto "Citação, original" da tabela da seção "<id>" na Copy
  And o figcaption dela tem o texto "Citação, tradução" da mesma tabela

  Examples:
    | id               |
    | ponto-de-partida |
    | analogia         |

@S-0006
Scenario Outline: Cada nível tem um card com número, metáfora, ícone e quem dirige
  Given o build concluído
  When o article com id "nivel-<n>" é lido
  Then ele está dentro da seção "niveis", e os seis cards aparecem na ordem de 0 a 5
  And o p com data-campo "numero" tem o texto "<n>"
  And o h3 tem o texto "metafora" da linha <n> da tabela "Níveis — metáfora e papéis" da Copy
  And ele contém exatamente um svg, com a classe "lucide-<icone>"
  And o elemento com data-campo "quem-dirige" tem o texto "Quem dirige: <quem>"

  Examples:
    | n | icone          | quem                   |
    | 0 | keyboard       | Você                   |
    | 1 | gauge          | Você                   |
    | 2 | car            | Você + IA              |
    | 3 | eye            | IA, com você revisando |
    | 4 | clipboard-list | IA                     |
    | 5 | factory        | IA                     |

@S-0007
Scenario Outline: Cada nível diz o que você faz, o que a IA faz e cita o autor
  Given o build concluído
  When o article com id "nivel-<n>" é lido
  Then o dt "O que você faz" é seguido do dd com data-campo "humano" e o texto "humano" da linha <n> da tabela "Níveis — metáfora e papéis" da Copy
  And o dt "O que a IA faz" é seguido do dd com data-campo "ia" e o texto "ia" da mesma linha
  And a figure com data-campo "citacao" que é filha direta do card tem um blockquote com lang "en" e o texto "citacao.original" da linha <n> da tabela "Níveis — citação" da Copy
  And o figcaption dela tem o texto "citacao.traducao" da mesma linha

  Examples:
    | n |
    | 0 |
    | 1 |
    | 2 |
    | 3 |
    | 4 |
    | 5 |

@S-0008
Scenario Outline: As ressalvas aparecem dentro do nível a que pertencem
  Given o build concluído
  When o article com id "nivel-<n>" é lido
  Then ele contém exatamente um aside com data-campo "ressalva"
  And o aside contém um p com data-campo "overline" e texto "RESSALVA"
  And o p com data-campo "contexto" tem o texto "ressalva.contexto" da linha <n> da tabela "Níveis — ressalva" da Copy
  And a figure do aside tem um blockquote com lang "en" e o texto "ressalva.original" da mesma linha
  And o figcaption dela tem o texto "ressalva.traducao" da mesma linha

  Examples:
    | n |
    | 2 |
    | 3 |
    | 5 |

@S-0009
Scenario: Os níveis 0, 1 e 4 não têm ressalva
  Given o build concluído
  When os articles "nivel-0", "nivel-1" e "nivel-4" são lidos
  Then nenhum deles contém um elemento com data-campo "ressalva"
  And a página tem exatamente três elementos com data-campo "ressalva"

@S-0010
Scenario Outline: Os destaques marcam os níveis 2, 3 e 4 na régua e no card
  Given o build concluído
  When o link da régua com href "#nivel-<n>" e o article "nivel-<n>" são lidos
  Then cada um contém exatamente um elemento com data-campo "destaque" e texto "<destaque>"

  Examples:
    | n | destaque                   |
    | 2 | 90% estão aqui             |
    | 3 | Quase todo mundo para aqui |
    | 4 | O Shapiro está aqui        |

@S-0011
Scenario: Só os níveis 2, 3 e 4 têm destaque
  Given o build concluído
  When a página é lida
  Then os links da régua para "#nivel-0", "#nivel-1" e "#nivel-5" e os articles "nivel-0", "nivel-1" e "nivel-5" não contêm elemento com data-campo "destaque"
  And a página tem exatamente seis elementos com data-campo "destaque"

@S-0012
Scenario: A régua é uma lista de âncoras que funciona sem JavaScript
  Given o build concluído
  When a seção "niveis" é lida sem executar JavaScript
  Then ela contém um nav com classe "regua" e aria-label "Níveis", antes do article "nivel-0"
  And o nav contém um ol com exatamente seis li, cada um com exatamente um link
  And o link de posição N, de 0 a 5, tem href "#nivel-N" e texto que começa com "Nível N"
  And o href de cada link aponta para o id de um article existente na página
  And nenhum link da régua tem o atributo aria-current

@S-0013
Scenario: O fechamento faz a pergunta aberta e leva ao artigo
  Given o build concluído
  When a seção "fechamento" é lida
  Then o p com data-campo "pergunta" tem o texto "Em que nível você trabalha hoje?"
  And ela contém um link com texto "Ler o artigo original" e href igual à URL do artigo das Constraints

@S-0014
Scenario: O rodapé credita o autor e a data do artigo
  Given o build concluído
  When o footer que vem depois de main é lido
  Then o p com data-campo "credito" tem o texto "Crédito" da tabela "Rodapé" da Copy

@S-0015
Scenario Outline: Cada termo em inglês vem explicado na primeira vez que aparece
  Given o build concluído
  When os elementos p, dd e figcaption de main são percorridos em ordem de documento, sem entrar em elementos com lang "en"
  Then o primeiro deles cujo texto contém "<termo>" como palavra inteira, sem diferenciar maiúsculas e aceitando o plural com "s", também contém "<explicacao>"

  Examples:
    | termo               | explicacao                                              |
    | dark factory        | uma fábrica que funciona sem pessoas no processo        |
    | spec                | as especificações escritas do que o software deve fazer |
    | technical deflation | a deflação técnica                                      |
    | NHTSA               | a agência de segurança no trânsito dos Estados Unidos   |
    | flow                | o estado de concentração contínua                       |
    | AI-native           | nativos em IA                                           |
    | human in the loop   | a pessoa que aprova cada passo                          |
    | diff                | a comparação entre a versão antiga e a nova do código   |
    | PM                  | a pessoa responsável pelo produto                       |
    | skill               | instruções reutilizáveis que ensinam a IA a fazer uma tarefa |

@S-0016
Scenario: A copy em pt-BR não tem exclamações nem emoji
  Given o build concluído
  When o texto de body é lido, sem os elementos com lang "en" e seus descendentes
  Then ele tem zero caracteres "!"
  And ele tem zero caracteres da propriedade Unicode Extended_Pictographic

@S-0017
Scenario: A página não tem imagens nem gradientes
  Given o build concluído
  When dist/index.html e o CSS que ele carrega são lidos
  Then o HTML tem zero elementos img, picture, video e canvas
  And o CSS tem zero ocorrências de "gradient("

@S-0018
Scenario: Os ícones são decorativos e herdam a cor do texto
  Given o build concluído
  When os svg de main são lidos
  Then main tem exatamente seis svg
  And cada um tem aria-hidden "true" e stroke "currentColor"

@S-0019
Scenario: Os arquivos do build usam caminhos relativos
  Given o build concluído
  When os atributos src e href de dist/index.html são lidos
  Then todo valor que não começa com "http", "#" ou "mailto:" começa com "./"
  And dist/index.html carrega exatamente um script e pelo menos uma folha de estilo de dist/

@S-0020
Scenario: As cores vêm só dos tokens
  Given o build concluído
  When o CSS que dist/index.html carrega é lido
  Then um bloco ":root" declara "--woba-color-surface-accent-primary", "--woba-color-surface-accent-secondary-subtle", "--woba-color-stroke-default", "--woba-color-surface-glass" e "--woba-color-content-feedback-neutral"
  And, comparadas como cores RGBA, essas variáveis valem #F9E10D, #F6F2E7, rgba(0,0,0,0.08), rgba(255,255,255,0.64) e #4A3E1C
  And o CSS fora dos blocos ":root" tem zero literais de cor no formato das Constraints

@S-0021
Scenario: A régua é fixa no topo e usa o vidro do design system
  Given o build concluído
  When as regras do CSS carregado cujo seletor é ".regua" são lidas
  Then elas declaram position "sticky", top "0", backdrop-filter "blur(4px)" e um background que usa "var(--woba-color-surface-glass)"

@manual @S-0022
Scenario: A régua marca o nível que está sendo lido
  Given a página aberta num navegador com JavaScript ligado
  When a pessoa rola a página até o card do Nível 3 ocupar a área visível abaixo da régua
  Then o link "Nível 3" da régua tem aria-current "true", fundo preto e texto branco
  And os outros cinco links da régua não têm aria-current
  And a mudança de cor leva 200ms, ou 0ms com prefers-reduced-motion ligado

@manual @S-0023
Scenario: A página cabe numa tela de 360px
  Given a página aberta num navegador com viewport de 360px de largura
  When a pessoa rola a página do topo ao rodapé
  Then document.documentElement.scrollWidth vale 360 em todo o percurso
  And só a régua rola na horizontal

@manual @S-0024
Scenario: A navegação por teclado mostra o foco e leva ao card
  Given a página aberta num navegador
  When a pessoa avança com Tab pelo link do cabeçalho e pelos seis links da régua e ativa o link "Nível 4" com Enter
  Then cada link focado mostra o anel de foco de duas camadas, branca de 1px e preta de 3px
  And a página rola até o card "nivel-4", com o h3 dele visível logo abaixo da régua
```

## Out of Scope

- A história ampla de "software factory" (OTAN em 1968, Japão, Microsoft em
  2004, DevOps) fica de fora: o objetivo é um vocabulário comum sobre a
  escala de Shapiro, e a pesquisa em `docs/research/software-factory.md`
  diluiria esse foco.
- Afirmações sobre como a Woba trabalha ou sobre a iniciativa de fábrica da
  Woba ficam de fora, porque a página é uma explicação neutra e atribuída
  ao autor.
- Quiz ou autoavaliação interativa fica de fora: a página fecha com uma
  pergunta aberta para levar a conversa ao time, não para pontuar ninguém.
- Tema escuro fica de fora porque os tokens `color.dark.*` não estão
  publicados na referência do design system; as cores ficam em variáveis
  `--woba-*` para facilitar a adição futura.
- Deploy e CI ficam de fora: a entrega é o `dist/` estático gerado por
  `npm run build`.
- Lint fica de fora porque o Toolchain Registry de `AGENTS.md` não tem um
  comando de lint; ele volta quando o Registry ganhar essa linha.
- Testes end-to-end em navegador, acessibilidade automatizada e orçamento
  de bytes ficam de fora; o nível ativo da régua, a largura de 360px e o
  foco por teclado são conferidos à mão pelos Scenarios `@manual`.
- As imagens do artigo original não são reutilizadas, porque o design
  system não usa ilustrações decorativas.

## Changelog

- 2026-10-19 — Versão inicial, sintetizada por `/df-to-spec` a partir de
  `docs/interview.md`. Spec e copy revisadas pelo Ricardo em 2026-10-19;
  esta versão ainda não foi mergeada.
