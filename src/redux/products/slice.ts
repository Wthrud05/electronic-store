import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IProduct, ProductsState, Status } from './types'
import { sortByParams } from '../../helpers'

const initialState: ProductsState = {
  products: [],
  status: Status.LOADING,
}

export type SortParams = {
  sort: string
  category: string
  search: string
}

export const fetchProducts = createAsyncThunk<IProduct[], SortParams>(
  'products/fetchProducts',
  async (params) => {
    const { sort = 'default', category = 'headphones', search = '' } = params

    const { data } = await axios.get<IProduct[]>(
      `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/products.json?orderBy="${sort}"&print=pretty`,
    )
    return sortByParams(data, sort, category, search)
  },
)

export const prodcutsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products = []
      state.status = Status.LOADING
    }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.status = Status.SUCESS
      }),
      builder.addCase(fetchProducts.rejected, (state) => {
        state.products = []
        state.status = Status.ERROR
      })
  },
})

export default prodcutsSlice.reducer
