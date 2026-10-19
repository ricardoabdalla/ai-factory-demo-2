// O único arquivo com copy da página. Os textos transcrevem literalmente a
// seção Copy de specs/cinco-niveis/spec.md.

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

export interface Pagina {
  title: string
  description: string
}

export interface Cabecalho {
  linkArtigo: string
}

export interface Hero {
  overline: string
  titulo: string
  paragrafo1: string
  paragrafo2: string
}

export interface Rodape {
  credito: string
}

export interface Conteudo {
  urlArtigo: string
  pagina: Pagina
  cabecalho: Cabecalho
  hero: Hero
  rodape: Rodape
}

export const conteudo: Conteudo = {
  urlArtigo:
    'https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/',
  pagina: {
    title: 'Os Cinco Níveis de Dan Shapiro',
    description:
      'Um resumo em português da escala de Dan Shapiro sobre quanto do trabalho de software já passou para a IA, do Nível 0 ao Nível 5.',
  },
  cabecalho: {
    linkArtigo: 'Ler o artigo original',
  },
  hero: {
    overline: 'OS CINCO NÍVEIS DE DAN SHAPIRO',
    titulo: 'Do autocomplete turbinado à dark factory',
    paragrafo1:
      'Dan Shapiro propôs uma escala para descrever quanto do trabalho de programação já passou para a IA. Ela vai do Nível 0, em que você digita cada linha, ao Nível 5, a dark factory: uma fábrica que funciona sem pessoas no processo e transforma specs, as especificações escritas do que o software deve fazer, em software.',
    paragrafo2:
      'Esta página resume a escala para dar um vocabulário comum a quem trabalha com engenharia, produto, design e liderança: dizer “estamos no Nível 3” e todo mundo entender a mesma coisa.',
  },
  rodape: {
    credito:
      'Baseado em “The Five Levels: from Spicy Autocomplete to the Dark Factory”, de Dan Shapiro, publicado em 23/01/2026.',
  },
}
