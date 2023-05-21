import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { UserDataState } from './types'

const initialState: UserDataState = {
  data: {
    email: '',
    key: '',
    name: '',
  },
  favorites: [],
  cart: [],
  orders: [],
}

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload)
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((fav) => fav.id !== action.payload)
    },
    setCartItem: (state, action) => (state.cart = action.payload),
  },
})

export default userDataSlice.reducer
export const { setUserData, setFavorites, addFavorite, removeFavorite } = userDataSlice.actions
