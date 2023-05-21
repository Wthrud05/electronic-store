export type Favorite = {
  id: string
  name: string
  price: number
  images: {
    black?: string
    white?: string
  }
}

export type CartItem = Favorite & {
  characteristics: {
    mark: string
  }
  type: string
  count: number
}

export type User = {
  uData: {
    email: string
    id: string
    name: string
    token: string
  }
  uFavorites: Favorite[]
}

export interface UserState {
  currentUser: User[]
}
