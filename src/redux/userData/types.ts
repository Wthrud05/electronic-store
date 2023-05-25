import { IProduct } from '../products/types'
import { Favorite } from '../user/types'

export interface UserDataState {
  data: {
    email: string
    key: string
    name: string
  }
  favorites: Favorite[]
  cart: IProduct[]
  orders?: []
}
