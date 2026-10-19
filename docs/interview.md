# Entrevista: página única sobre os cinco níveis de Dan Shapiro

- **Data:** 2026-10-18
- **Participantes:** Ricardo Abdalla e Claude (sessão `/df-interview`)
- **Pedido original:** criar um website de uma única página, baseado no design system da Woba ([docs/Woba Design System - ui reference.md](Woba%20Design%20System%20-%20ui%20reference.md)), explorando a escala de Software Factory de Dan Shapiro, explicada em português brasileiro.
- **Próximo passo:** rodar `/df-to-spec` para transformar este sumário na Living Spec.

## Fonte

"The Five Levels: from Spicy Autocomplete to the Dark Factory", de Dan Shapiro, publicado em 23/01/2026: <https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/>

Tese: o custo de escrever código está caindo rápido ("technical deflation"). Quem só usa IA para tarefas pontuais "isn't really getting the benefits of deflation. You're just typing faster." A escala adapta os níveis de direção autônoma da NHTSA (2013), que deram "a common language for both where things were, and where things were going".

| Nível | Metáfora do carro | Humano | IA | Frases marcantes |
| --- | --- | --- | --- | --- |
| 0 | "your parents' Volvo, maybe with an automatic transmission" | Escreve tudo; "not a character hits the disk without your approval" | "search engine on steroids", sugestões de tab ocasionais | "the code is unmistakably yours. This is manual labor in a deflationary world." |
| 1 | "lanekeeping and cruise control" | Escreve o código importante e delega tarefas pontuais ao "AI intern" ("Write a unit test for this.", "Add a docstring.") | Executa as tarefas pontuais | "your job is unchanged. You're still moving at the rate you type." |
| 2 | "Autopilot on the highway" | Pareia com a IA "like a colleague"; entra em flow | Colaborador júnior ("junior buddy") | "This is where 90% of 'AI-native' developers are living right now." Ressalva: "level 2, and every level after it, feels like you are done. But you are not done." |
| 3 | "a Waymo with a safety driver" | Gerente, "the human in the loop"; várias abas de agentes; revisa código | O desenvolvedor sênior | "Your life is diffs." Ressalva: "For many people, this feels like things got worse." "And almost everyone tops out here." |
| 4 | "a robotaxi" | PM; escreve specs, discute specs com a IA, cria skills, revisa planos, sai por 12 horas e confere se os testes passaram | Executa a spec em longas execuções sem supervisão | "You've now become that which you loathed." Shapiro: "I'm here." |
| 5 | Caixa-preta / Fanuc Dark Factory | Fora do ciclo de desenvolvimento | Todo o processo | "It's a black box that turns specs into software." "Dark" porque é "a place where humans are neither needed nor welcome." Ressalva: Shapiro conhece "a handful of people", em "small teams, less than five people". |

Observações sobre a fonte:
- O artigo não dá nomes formais aos níveis; os rótulos são as metáforas de carro.
- O título usa "software factory", mas o texto só define "dark factory" (Nível 5).
- As atribuições de nível são observações do autor em "dozens of companies", não dados medidos.
- As imagens do artigo não serão reutilizadas, porque o design system proíbe ilustrações decorativas.

## Decisões

| # | Tema | Decisão |
| --- | --- | --- |
| 1 | Escopo | Só os cinco níveis do Shapiro (0 a 5). A pesquisa ampla em [docs/research/software-factory.md](research/software-factory.md) fica de fora. |
| 2 | Público | Time interno da Woba, misto: engenharia, produto, design e liderança. Objetivo: criar vocabulário comum ("estamos no Nível 3"). Termos técnicos têm explicação curta, sem jargão solto. |
| 3 | Posicionamento | Explicação fiel e neutra, com atribuição clara ("segundo Shapiro…"), sem afirmar nada sobre a Woba. Fecha com a pergunta aberta "Em que nível você trabalha hoje?". |
| 4 | Stack | Vite + TypeScript, sem framework. Os tokens `--woba-*` entram como CSS próprio (Opção 2 do DS), sem o pacote privado `@woba/ds-tokens`. |
| 5 | Estrutura | 5 seções: Hero, Ponto de partida (deflação técnica), Analogia NHTSA (enxuta), Os seis níveis, Fechamento. As ressalvas ficam dentro do nível a que pertencem (2, 3 e 5), sem seção separada. |
| 6 | Apresentação dos níveis | Uma régua-resumo horizontal com os seis níveis, sticky (efeito de vidro do DS: `rgba(255,255,255,0.64)` + blur de 4px), com o nível visível marcado. Cada item é âncora para o card detalhado. Destaques em amarelo: "90% estão aqui" (Nível 2), "quase todo mundo para aqui" (Nível 3) e "o Shapiro está aqui" (Nível 4). Sem JS, funciona como lista de âncoras. |
| 7 | Diferenciação visual | Monocromático. Por nível: número grande (label.xlarge), ícone Lucide ligado à metáfora (sugestão: `keyboard`, `gauge`, `car`, `eye`, `clipboard-list`, `factory`) e badge textual "Quem dirige" (*Você*, *Você + IA*, *IA, com você revisando*, *IA*). Citação em bloco sand `#F6F2E7`. Sem paletas decorativas ou de Intelligence, e sem barras com percentuais inventados. |
| 8 | Citações | Original em inglês em destaque (Noticia Text itálico, bloco sand), com a tradução em pt-BR abaixo, em caption. Jargão (diff, spec, dark factory) aparece em inglês no texto corrido, com explicação curta na primeira ocorrência. |
| 9 | Tema | Só claro. Os tokens `color.dark.*` não estão publicados na referência; tudo fica em variáveis `--woba-*` para facilitar uma adição futura. |
| 10 | Deploy | Fora do escopo. A entrega é `npm run build`, que gera um `dist/` estático, com `base: './'` no Vite para funcionar em qualquer subcaminho. |
| 11 | Verificação | `typecheck` (tsc), `lint` e `build` passando. Sem e2e, axe ou orçamento de bytes por enquanto. **Ajuste na sessão `/df-to-spec`:** entra um script `test` (Vitest + linkedom) que lê o `dist/index.html` gerado, sem navegador. Essa é a única seam de teste. O nível ativo da régua, a ausência de rolagem horizontal em 360px e o foco por teclado ficam como cenários `@manual`. |
| 12 | Copy | Texto completo em pt-BR redigido na spec (`/df-to-spec`) e revisado pelo Ricardo antes de qualquer código. A implementação só transcreve. A copy vive em um único arquivo de dados, `src/content.ts`. |
| 13 | Renderização | Um plugin do Vite (`transformIndexHtml`) gera o HTML final no build a partir de `src/content.ts`. O JS do navegador cuida só do comportamento da régua sticky (nível ativo). `content.ts` é tipado, então o `typecheck` garante que todo nível tem todos os campos: metáfora, quem dirige, papel do humano, papel da IA, citação original, tradução e ressalva (quando houver). |

## Padrões assumidos (não contestados)

- **Fontes:** Google Fonts (Noticia Text, Host Grotesk, Manrope), com o `<link>` exato do DS.
- **Ícones:** Lucide via npm, inseridos como SVG inline no build, com `aria-hidden` e `currentColor`.
- **Cabeçalho:** marca W da Woba em preto sobre tile amarelo, mais o link "Ler o artigo original".
- **Rodapé:** crédito a Dan Shapiro e data do artigo (23/01/2026).
- **Grid:** 4, 8 e 12 colunas, com breakpoints em 600px e 1024px e largura máxima de conteúdo de 1216px.
- **Movimento:** só fade e transição de 200ms (`cubic-bezier(0.2, 0, 0, 1)`) no nível ativo da régua.
- **Regras do DS que valem para a página toda:** fundo branco ou grey 50; cards brancos com borda `rgba(0,0,0,0.08)` e raio de 24px; controles em pílula; sem gradientes, padrões, emoji ou ilustrações; copy em pt-BR com "você" e sem exclamações; Title Case nos títulos de seção e overlines em UPPERCASE; anel de foco de 2 camadas em `:focus-visible`.

## Fora do escopo

- História ampla de "software factory" (OTAN 1968, Japão, Microsoft 2004, DevOps).
- Afirmações sobre como a Woba trabalha ou sobre a iniciativa de fábrica da Woba.
- Quiz ou autoavaliação interativa.
- Tema escuro.
- Deploy e CI.
- Testes e2e, acessibilidade automatizada e orçamento de desempenho.
