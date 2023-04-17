import { createSlice } from '@reduxjs/toolkit'
import { AuthState } from './types'

const initialState: AuthState = {
  name: null,
  email: null,
  token: null,
  id: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.token = action.payload.token
      state.id = action.payload.id
    },
    removeUser: (state) => {
      state.name = null
      state.email = null
      state.token = null
      state.id = null
    },
  },
})

export const { setUser, removeUser } = authSlice.actions

export default authSlice.reducer
