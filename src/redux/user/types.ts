// export type UserData = {
//   key: string
//   email: string
//   name: string
// }

// export interface CurrentUserState {
//   data: UserData
//   userCart?: []
//   userOrders?: []
//   userFavorites?: Favorite[]
// }

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
}

export interface UserState {
  currentUser: User[]
}
