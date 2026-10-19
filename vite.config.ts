import { defineConfig, type Plugin } from 'vite'
import { conteudo } from './src/content.ts'
import { renderCabeca, renderPagina } from './src/render.ts'

// Troca `alvo` por `valor` e falha o build se a casca não tiver o alvo.
function substituir(html: string, alvo: string, valor: string): string {
  if (!html.includes(alvo)) {
    throw new Error(`index.html não tem ${alvo}`)
  }
  return html.replace(alvo, () => valor)
}

// Renderiza a página no build: o HTML de dist/index.html sai completo.
function pagina(): Plugin {
  return {
    name: 'cinco-niveis:pagina',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const cabeca = renderCabeca(conteudo.pagina)
        let saida = substituir(html, '<title></title>', cabeca.title)
        saida = substituir(saida, '<meta name="description" content="">', cabeca.description)
        return substituir(saida, '<!--pagina-->', renderPagina(conteudo))
      },
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [pagina()],
})
