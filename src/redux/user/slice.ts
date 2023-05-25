import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User, UserState } from './types'
import axios from 'axios'

export const fetchUserData = createAsyncThunk<User[], string>(
  'user/fetchUserData',
  async (email: string) => {
    console.log('fetch user')

    const { data } = await axios.get<User[]>(
      'https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users.json',
    )

    let res = {}

    for (let d in data) {
      if (data[d].uData.email === email) {
        res = { [d]: data[d] }
      }
    }

    return res as User[]
  },
)

const initialState: UserState = {
  currentUser: [],
}

const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrUser: (state, action) => {
      state.currentUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  },
})

export default userSlice.reducer
export const { setCurrUser } = userSlice.actions
