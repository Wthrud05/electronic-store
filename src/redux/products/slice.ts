import axios from 'axios'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { IProduct, ProductState, Status } from './types'

const initialState: ProductState = {
  products: [],
  status: Status.LOADING,
}

export const fetchProducts = createAsyncThunk<IProduct[]>(
  'products/products/fetchProducts',
  async () => {
    const { data } = await axios.get<IProduct[]>(
      'https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/products.json',
    )
    return data
  },
)

export const prodcutsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.products = []
      state.status = Status.LOADING
    }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.status = Status.SUCESS
      }),
      builder.addCase(fetchProducts.rejected, (state, action) => {
        state.products = []
        state.status = Status.ERROR
      })
  },
})

export default prodcutsSlice.reducer
