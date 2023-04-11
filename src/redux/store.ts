import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import productsReducer from './products/slice'

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
