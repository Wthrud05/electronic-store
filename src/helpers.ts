import axios from 'axios'
import { IProduct } from './redux/products/types'
import { Favorite, UserData } from './redux/user/types'

export const sortByParams = (data: IProduct[], sort: string, category: string, search: string) => {
  switch (sort) {
    case 'default':
      if (category === 'All') return filterBySearch(data, search)
      const a = filterByCategory(data, category)
      return filterBySearch(a, search)

    case 'price':
      if (category === 'All') return filterBySearch(data, search).sort((a, b) => b.price - a.price)

      const b = filterByCategory(data, category)
      return filterBySearch(b, search).sort((a, b) => b.price - a.price)

    case 'rating':
      if (category === 'All')
        return filterBySearch(data, search).sort((a, b) => b.rating - a.rating)

      const c = filterByCategory(data, category)
      return filterBySearch(c, search).sort((a, b) => b.rating - a.rating)
    default:
      return data
  }
}

const filterByCategory = (data: IProduct[], param: string) => {
  return data.filter((i) => i.type.includes(param.toLowerCase()))
}

const filterBySearch = (data: IProduct[], param: string) => {
  return data.filter((i) => i.name.toLowerCase().includes(param.toLowerCase()))
}

export const postData = async (url: string, data: any) => {
  return await axios.post(url, data)
}

export const patchData = async (url: string, data: any) => {
  return await axios.patch(url, data)
}

export const putData = async (url: string, data: any) => {
  return await axios.put(url, data)
}

export const getCurrentUser = async (email: string) => {
  try {
    const res = await fetch(
      'https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users.json',
    )
    const data = await res.json()

    const users = Object.entries(data)
    const curr = users.filter((user: any) => user[1].uData.email === email)

    const currentKey = curr[0][0]
    const currentUser: any = curr[0][1]
    const user: UserData = {
      key: currentKey,
      email: currentUser.uData.email,
      name: currentUser.uData.name,
    }

    localStorage.setItem('currentUser', JSON.stringify(user))
  } catch (e) {
    if (e instanceof TypeError) {
      console.log('No Current User')
    }
  }
}
