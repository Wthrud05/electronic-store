import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { CurrentUserState, Favorite, UserData } from './types'
import axios from 'axios'

const initialState: CurrentUserState = {
  data: {
    key: '',
    email: '',
    name: '',
  },
  userCart: [],
  userOrders: [],
  userFavorites: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload
    },
    setFavorite: (state, action: PayloadAction<Favorite>) => {
      state.userFavorites?.push(action.payload)
    },
    setFavorites: (state, action: PayloadAction<Favorite[]>) => {
      state.userFavorites = action.payload
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      console.log(action.payload)

      state.userFavorites = state.userFavorites?.filter((fav) => fav.id !== action.payload)
    },
  },
})

export default userSlice.reducer
export const { setCurrentUser, setFavorite, setFavorites, removeFavorite } = userSlice.actions
