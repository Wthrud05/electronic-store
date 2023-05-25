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
    count: 0,
  },
}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = { ...action.payload, count: 1 }
    },
    setChoosenColor: (state, action) => {
      state.product.choosenColor = action.payload
    },
  },
})

export const { setProduct, setChoosenColor } = ProductSlice.actions
export default ProductSlice.reducer
