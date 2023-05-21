import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ProductState } from './types'
import { IProduct } from '../products/types'
import axios from 'axios'

const initialState: ProductState = {
  product: {
    id: '',
    name: '',
    type: '',
    price: 0,
    rating: 0,
    images: {
      black: '',
      white: '',
    },
    colors: [],
    characteristics: [{ name: '', value: '' }],
  },
}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload
    },
  },
})

export const { setProduct } = ProductSlice.actions
export default ProductSlice.reducer
