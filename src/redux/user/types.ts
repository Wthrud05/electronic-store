import { IProduct } from '../products/types'

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
}

export interface UserState {
  currentUser: User[]
}
