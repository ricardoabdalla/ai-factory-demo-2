// A seam única da spec: o dist/ gerado pelo build, lido a partir de
// dist/index.html. Nada aqui importa de src/; os valores esperados repetem
// literalmente specs/cinco-niveis/spec.md.
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parseHTML } from 'linkedom'
import { describe, expect, it } from 'vitest'

const DIST = fileURLToPath(new URL('../dist/', import.meta.url))
const html = readFileSync(`${DIST}index.html`, 'utf8')
const { document } = parseHTML(html)

// Folhas de estilo de dist/ que o index.html carrega.
const hrefsDeEstilo = [...document.querySelectorAll('link[rel="stylesheet"]')]
  .map((link) => link.getAttribute('href') ?? '')
  .filter((href) => href.startsWith('./'))
const css = hrefsDeEstilo.map((href) => readFileSync(`${DIST}${href.slice(2)}`, 'utf8')).join('\n')

// Literais da spec.
const URL_ARTIGO =
  'https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/'
const LINK_FONTES =
  'https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300..800&family=Manrope:wght@200..800&family=Noticia+Text:ital,wght@1,700&display=swap'
const IDS_SECOES = ['inicio', 'ponto-de-partida', 'analogia', 'niveis', 'fechamento']

// Texto de um nó sem os elementos com lang "en" e seus descendentes.
function textoSemIngles(no: Node): string {
  if (no.nodeType === 3) return no.textContent ?? ''
  if (no.nodeType !== 1) return ''
  if ((no as Element).getAttribute('lang') === 'en') return ''
  return [...no.childNodes].map(textoSemIngles).join('')
}

function dentroDeIngles(el: Element): boolean {
  for (let atual: Element | null = el; atual; atual = atual.parentElement) {
    if (atual.getAttribute('lang') === 'en') return true
  }
  return false
}

interface Rgba { r: number; g: number; b: number; a: number }

// Lê uma cor CSS em hex (3, 4, 6 ou 8 dígitos), rgb() ou rgba().
function lerCor(valor: string): Rgba {
  const v = valor.trim().toLowerCase()
  const hex = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(v)
  if (hex) {
    let d = hex[1]
    if (d.length <= 4) d = [...d].map((c) => c + c).join('')
    const n = (i: number) => parseInt(d.slice(i, i + 2), 16)
    return { r: n(0), g: n(2), b: n(4), a: d.length === 8 ? n(6) / 255 : 1 }
  }
  const fn = /^rgba?\(([^)]*)\)$/.exec(v)
  if (fn) {
    const partes = fn[1].split(/[\s,/]+/).filter(Boolean)
    const alfa = partes[3] === undefined ? 1 : partes[3].endsWith('%') ? parseFloat(partes[3]) / 100 : parseFloat(partes[3])
    return { r: Number(partes[0]), g: Number(partes[1]), b: Number(partes[2]), a: alfa }
  }
  throw new Error(`cor não reconhecida: ${valor}`)
}

function mesmaCor(valor: string, esperado: string): boolean {
  const a = lerCor(valor)
  const b = lerCor(esperado)
  return a.r === b.r && a.g === b.g && a.b === b.b && Math.abs(a.a - b.a) <= 1 / 255
}

const BLOCO_ROOT = /:root\s*\{([^}]*)\}/g

describe('dist/index.html', () => {
  it('carrega CSS de dist/', () => {
    expect(hrefsDeEstilo.length).toBeGreaterThan(0)
    expect(css.length).toBeGreaterThan(0)
  })

  // Em vigor parcial até TASK-003: cada section de main tem um id da lista,
  // na ordem relativa dela, e o h1 único está em "inicio".
  it('S-0001 A página chega completa no HTML gerado', () => {
    expect(document.documentElement.getAttribute('lang')).toBe('pt-BR')
    expect(document.querySelector('title')?.textContent).toBe('Os Cinco Níveis de Dan Shapiro')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Um resumo em português da escala de Dan Shapiro sobre quanto do trabalho de software já passou para a IA, do Nível 0 ao Nível 5.',
    )

    const main = document.querySelector('main')
    expect(main).not.toBeNull()
    const ids = [...main!.children].filter((el) => el.tagName === 'SECTION').map((el) => el.id)
    expect(ids.length).toBeGreaterThan(0)
    const posicoes = ids.map((id) => IDS_SECOES.indexOf(id))
    expect(posicoes).not.toContain(-1)
    expect(posicoes).toEqual([...posicoes].sort((a, b) => a - b))
    expect(new Set(ids).size).toBe(ids.length)

    const h1s = document.querySelectorAll('h1')
    expect(h1s.length).toBe(1)
    expect(h1s[0].closest('section')?.id).toBe('inicio')
  })

  it('S-0002 O cabeçalho traz a marca e o link para o artigo', () => {
    const header = document.querySelector('header')
    expect(header).not.toBeNull()
    const main = document.querySelector('main')!
    // O header vem antes de main.
    expect(header!.compareDocumentPosition(main) & 4).toBe(4)

    const marca = header!.querySelector('[data-campo="marca"]')
    expect(marca).not.toBeNull()
    expect(marca!.querySelector('svg')?.getAttribute('aria-label')).toBe('Woba')

    const link = header!.querySelector('a[data-campo="link-artigo"]')
    expect(link).not.toBeNull()
    expect(link!.textContent).toBe('Ler o artigo original')
    expect(link!.getAttribute('href')).toBe(URL_ARTIGO)
  })

  it('S-0003 As fontes do design system são carregadas com o link exato', () => {
    const hrefs = [...document.head.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.getAttribute('href'))
    expect(hrefs).toContain(LINK_FONTES)
  })

  // Em vigor parcial até TASK-003: a linha "inicio" dos Examples.
  it('S-0004 Cada seção abre com a overline e o título da Copy (inicio)', () => {
    const secao = document.querySelector('section#inicio')
    expect(secao).not.toBeNull()

    const primeiro = secao!.firstElementChild
    expect(primeiro?.tagName).toBe('P')
    expect(primeiro?.getAttribute('data-campo')).toBe('overline')
    expect(primeiro?.textContent).toBe('OS CINCO NÍVEIS DE DAN SHAPIRO')

    expect(secao!.querySelector('h1')?.textContent).toBe('Do autocomplete turbinado à dark factory')

    const paragrafos = [...secao!.querySelectorAll('p[data-campo="paragrafo"]')].map((p) => p.textContent)
    expect(paragrafos).toEqual([
      'Dan Shapiro propôs uma escala para descrever quanto do trabalho de programação já passou para a IA. Ela vai do Nível 0, em que você digita cada linha, ao Nível 5, a dark factory: uma fábrica que funciona sem pessoas no processo e transforma specs, as especificações escritas do que o software deve fazer, em software.',
      'Esta página resume a escala para dar um vocabulário comum a quem trabalha com engenharia, produto, design e liderança: dizer “estamos no Nível 3” e todo mundo entender a mesma coisa.',
    ])
  })

  it('S-0014 O rodapé credita o autor e a data do artigo', () => {
    const footer = document.querySelector('footer')
    expect(footer).not.toBeNull()
    const main = document.querySelector('main')!
    // O footer vem depois de main.
    expect(main.compareDocumentPosition(footer!) & 4).toBe(4)
    expect(footer!.querySelector('p[data-campo="credito"]')?.textContent).toBe(
      'Baseado em “The Five Levels: from Spicy Autocomplete to the Dark Factory”, de Dan Shapiro, publicado em 23/01/2026.',
    )
  })

  // Em vigor parcial até TASK-003: as linhas "dark factory" e "spec" dos Examples.
  describe('S-0015 Cada termo em inglês vem explicado na primeira vez que aparece', () => {
    const exemplos = [
      { termo: 'dark factory', explicacao: 'uma fábrica que funciona sem pessoas no processo' },
      { termo: 'spec', explicacao: 'as especificações escritas do que o software deve fazer' },
    ]

    for (const { termo, explicacao } of exemplos) {
      it(termo, () => {
        const palavra = new RegExp(`(?<![\\p{L}\\p{N}])${termo}s?(?![\\p{L}\\p{N}])`, 'iu')
        const main = document.querySelector('main')!
        const textos = [...main.querySelectorAll('p, dd, figcaption')]
          .filter((el) => !dentroDeIngles(el))
          .map(textoSemIngles)
        const primeiro = textos.find((texto) => palavra.test(texto))
        expect(primeiro, `nenhum p, dd ou figcaption cita "${termo}"`).toBeDefined()
        expect(primeiro).toContain(explicacao)
      })
    }
  })

  it('S-0016 A copy em pt-BR não tem exclamações nem emoji', () => {
    const texto = textoSemIngles(document.body)
    expect(texto.length).toBeGreaterThan(0)
    expect(texto).not.toContain('!')
    expect(texto).not.toMatch(/\p{Extended_Pictographic}/u)
  })

  it('S-0017 A página não tem imagens nem gradientes', () => {
    expect(document.querySelectorAll('img, picture, video, canvas').length).toBe(0)
    expect(css).not.toContain('gradient(')
  })

  it('S-0019 Os arquivos do build usam caminhos relativos', () => {
    const valores = [...document.querySelectorAll('[src], [href]')].flatMap((el) =>
      ['src', 'href'].map((attr) => el.getAttribute(attr)).filter((v): v is string => v !== null),
    )
    expect(valores.length).toBeGreaterThan(0)
    for (const valor of valores) {
      if (valor.startsWith('http') || valor.startsWith('#') || valor.startsWith('mailto:')) continue
      expect(valor).toMatch(/^\.\//)
    }

    const scripts = [...document.querySelectorAll('script')]
    expect(scripts.length).toBe(1)
    const src = scripts[0].getAttribute('src') ?? ''
    expect(src).toMatch(/^\.\//)
    expect(existsSync(`${DIST}${src.slice(2)}`)).toBe(true)

    expect(hrefsDeEstilo.length).toBeGreaterThanOrEqual(1)
    for (const href of hrefsDeEstilo) {
      expect(existsSync(`${DIST}${href.slice(2)}`)).toBe(true)
    }
  })

  it('S-0020 As cores vêm só dos tokens', () => {
    const variaveis = new Map<string, string>()
    for (const [, corpo] of css.matchAll(BLOCO_ROOT)) {
      for (const declaracao of corpo.split(';')) {
        const i = declaracao.indexOf(':')
        if (i < 0) continue
        variaveis.set(declaracao.slice(0, i).trim(), declaracao.slice(i + 1).trim())
      }
    }

    const esperadas: Record<string, string> = {
      '--woba-color-surface-accent-primary': '#F9E10D',
      '--woba-color-surface-accent-secondary-subtle': '#F6F2E7',
      '--woba-color-stroke-default': 'rgba(0,0,0,0.08)',
      '--woba-color-surface-glass': 'rgba(255,255,255,0.64)',
      '--woba-color-content-feedback-neutral': '#4A3E1C',
    }
    for (const [nome, cor] of Object.entries(esperadas)) {
      const valor = variaveis.get(nome)
      expect(valor, `${nome} não está declarada num bloco :root`).toBeDefined()
      expect(mesmaCor(valor!, cor), `${nome} vale ${valor}, esperado ${cor}`).toBe(true)
    }

    const foraDoRoot = css.replace(BLOCO_ROOT, '')
    expect(foraDoRoot).not.toMatch(/#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})(?![0-9a-z_-])/i)
    expect(foraDoRoot).not.toMatch(/rgba?\(/i)
  })
})
