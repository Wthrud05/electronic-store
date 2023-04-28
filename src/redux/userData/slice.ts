import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { UserDataState } from './types'

const initialState: UserDataState = {
  data: {
    email: '',
    key: '',
    name: '',
  },
  favorites: [],
  cart: [],
  orders: [],
}

// export const updateUserData = createAsyncThunk<Favorite[], any>(
//   'userData/updateUserData',
//   async (data, thunkApi) => {
//     try {
//       console.log(thunkApi)

//       const response = await axios.put<Favorite[], any>(
//         `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users/-NTPQHlXChuNMzsN_-3n/uFavorites.json`,
//         data,
//       )
//       return response
//     } catch (err) {
//       console.log(err)
//     }
//   },
// )

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload)
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((fav) => fav.id !== action.payload)
    },
  },
})

export default userDataSlice.reducer
export const { setUserData, setFavorites, addFavorite, removeFavorite } = userDataSlice.actions
