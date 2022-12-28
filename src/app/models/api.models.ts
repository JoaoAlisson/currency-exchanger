
export interface ConvertResponse {
  success: boolean,
  query: {
      from: string,
      to: string,
      amount: number
  },
  info: {
      timestamp: number,
      quote: number
  },
  result: number
}

export interface LiveResponse {
    quotes: {
      [key: string]: number
    },
    source: string,
    success: boolean,
    timestamp: number
}

export interface ListResponse {
  currencies: {
    [key: string]: string
  }
}

export enum MainCurrencies {
  USD = 'USD',
  EUR = 'EUR',
  BRL = 'BRL'
}
