import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FiltersState } from './types'

const initialState: FiltersState = {
  sort: 'default',
  category: 'All',
  search: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<string>) => {
      state.sort = action.payload
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const { setSortType, setCategory, setSearch } = filtersSlice.actions
export default filtersSlice.reducer
