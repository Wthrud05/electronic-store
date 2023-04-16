import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import productsReducer from './products/slice'
import filterReducer from './filters/slice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
