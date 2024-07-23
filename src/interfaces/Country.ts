export interface Country {
  name: {
    common: string
    official: string
  }
  flags: {
    svg: string
  }
  cca3: string
  region: string
  capital: string
  population: number
  tld: Array<string>
  languages: {
    [key: string]: string
  }
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  borders: Array<string>
  area: number
  subregion: string
}
