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
  colors: string[]
  characteristics: Characteristic[]
  sort?: string
  param?: string
  choosenColor?: string
}

type Characteristic = {
  name: string
  value: string
}

export interface ProductsState {
  products: IProduct[]
  status: Status
}

export enum Status {
  LOADING = 'loading',
  SUCESS = 'sucess',
  ERROR = 'error',
}
