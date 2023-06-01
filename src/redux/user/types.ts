import { IProduct } from '../products/types'
import { Order } from '../userData/types'

export type Favorite = {
  id: string
  name: string
  price: number
  images: {
    black?: string
    white?: string
  }
}

export type User = {
  uData: {
    email: string
    id: string
    name: string
    token: string
  }
  uFavorites: Favorite[]
  uCart: IProduct[]
  uOrders: Order[]
}

export interface UserState {
  currentUser: User[]
}
