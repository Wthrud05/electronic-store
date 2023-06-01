import { createSlice } from '@reduxjs/toolkit'
import { PaymentState } from './types'

const initialState: PaymentState = {
  products: [],
  productsCount: 0,
  totalPrice: 0,
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setProductsCount: (state, action) => {
      state.productsCount = action.payload
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload
    },
  },
})

export const { setProducts, setProductsCount, setTotalPrice } = paymentSlice.actions
export default paymentSlice.reducer
