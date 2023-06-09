import { IProduct } from '../products/types'
import { Favorite } from '../user/types'

export type Order = {
  products: IProduct[]
  totalPrice: number
  productsCount: number
}

export interface UserDataState {
  data: {
    email: string
    key: string
    name: string
  }
  favorites: Favorite[]
  cart: IProduct[]
  orders: Order[]
}
