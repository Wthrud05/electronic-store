export type UserData = {
  key: string
  email: string
  name: string
}

export type Favorite = {
  id: string
  name: string
  price: number
  images: {
    black?: string
    white?: string
  }
}

export interface CurrentUserState {
  data: UserData
  userCart?: []
  userOrders?: []
  userFavorites?: Favorite[]
}
