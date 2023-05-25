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
    setCartItem: (state, action) => {
      const findItem = state.cart.find(
        (item) =>
          item.id === action.payload.id && item.choosenColor === action.payload.choosenColor,
      )
      if (findItem) {
        findItem.count++
      } else {
        state.cart.push(action.payload)
      }
    },
    setCartItems: (state, action) => {
      state.cart = action.payload
    },
  },
})

export default userDataSlice.reducer
export const { setUserData, setFavorites, addFavorite, removeFavorite, setCartItem, setCartItems } =
  userDataSlice.actions
