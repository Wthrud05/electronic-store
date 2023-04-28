import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import productsReducer from './products/slice'
import filterReducer from './filters/slice'
import authReducer from './auth/slice'
import userReducer from './user/slice'
import userDataReducer from './userData/slice'
import { useSelector } from 'react-redux'

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filterReducer,
    auth: authReducer,
    currentUser: userReducer,
    userData: userDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
