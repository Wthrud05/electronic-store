import { createSlice } from '@reduxjs/toolkit'
import { CartState } from './types'

const initialState: CartState = {
  products: [],
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.products.push(action.payload)
    },
  },
})

export const { addCartItem } = CartSlice.actions
export default CartSlice.reducer
