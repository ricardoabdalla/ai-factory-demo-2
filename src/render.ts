// Gera, no build, o HTML da página a partir de `conteudo`. Só marcação: toda
// copy vem de src/content.ts.
import type { Conteudo, Hero, Pagina } from './content.ts'

const ENTIDADES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function escapar(texto: string): string {
  return texto.replace(/[&<>"']/g, (c) => ENTIDADES[c])
}

// A marca W da Woba, do design system; herda a cor do texto.
const MARCA_W =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 307.724 205.425" fill="none" role="img" aria-label="Woba">' +
  '<path fill="currentColor" d="M 0 8.491 L 0 0 L 34.766 0 L 72.289 182.493 C 72.68 184.469 73.484 185.664 76.632 185.664 C 79.781 185.664 80.584 184.469 80.975 182.493 L 120.084 0 L 187.64 0 L 226.748 182.493 C 227.14 184.469 227.943 185.664 231.092 185.664 C 234.24 185.664 235.044 184.469 235.434 182.493 L 272.958 0 L 307.724 0 L 307.724 7.905 L 266.053 205.425 L 196.521 205.425 L 157.413 22.931 C 157.021 20.955 156.218 19.761 153.851 19.761 C 151.484 19.761 150.68 20.955 150.29 22.931 L 111.181 205.425 L 41.671 205.425 L 0 8.491 Z"/>' +
  '</svg>'

function renderCabecalho(c: Conteudo): string {
  return `<header class="cabecalho">
  <span class="marca" data-campo="marca">${MARCA_W}</span>
  <a class="link-artigo" data-campo="link-artigo" href="${escapar(c.urlArtigo)}">${escapar(c.cabecalho.linkArtigo)}</a>
</header>`
}

function renderInicio(h: Hero): string {
  return `<section id="inicio" class="secao secao--inicio">
    <p class="overline" data-campo="overline">${escapar(h.overline)}</p>
    <h1>${escapar(h.titulo)}</h1>
    <p class="paragrafo" data-campo="paragrafo">${escapar(h.paragrafo1)}</p>
    <p class="paragrafo" data-campo="paragrafo">${escapar(h.paragrafo2)}</p>
  </section>`
}

function renderRodape(c: Conteudo): string {
  return `<footer class="rodape">
  <p class="credito" data-campo="credito">${escapar(c.rodape.credito)}</p>
</footer>`
}

export function renderPagina(c: Conteudo): string {
  return `${renderCabecalho(c)}
<main>
  ${renderInicio(c.hero)}
</main>
${renderRodape(c)}`
}

// O `<title>` e a `<meta name="description">` da casca, preenchidos com a
// tabela Página da Copy.
export function renderCabeca(p: Pagina): { title: string; description: string } {
  return {
    title: `<title>${escapar(p.title)}</title>`,
    description: `<meta name="description" content="${escapar(p.description)}">`,
  }
}
