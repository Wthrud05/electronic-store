export type IProduct = {
  id: string
  name: string
  type: string
  price: number
  rating: number
  images: {
    black?: string
    white?: string
  }
  color: string[]
  characterisrics: {
    ch1: string
    ch2: string
    ch3: string
  }
}

export interface ProductState {
  products: IProduct[]
  status: Status
}

export enum Status {
  LOADING = 'loading',
  SUCESS = 'sucess',
  ERROR = 'error',
}
