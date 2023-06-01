import axios from 'axios'
import { IProduct } from './redux/products/types'
import { UserDataState } from './redux/userData/types'
import { Favorite } from './redux/user/types'

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

export const putData = async (url: string, data: any) => {
  return await axios.put(url, data)
}

export const updateFavorites = (userdata: any, favorites: Favorite[]) => {
  if (userdata) {
    const key = userdata.key
    putData(
      `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users/${key}/uFavorites.json`,
      favorites,
    )
  }
}

export const updateCartItems = (userData: any, data: any) => {
  if (userData) {
    const key = userData.key
    putData(
      `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users/${key}/uCart.json`,
      data,
    )
  }
}

export const updateOrders = (userData: any, data: any) => {
  if (userData) {
    const key = userData.key
    putData(
      `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users/${key}/uOrders.json`,
      data,
    )
  }
}

export const getTotalPrice = (arr: IProduct[]) => {
  return arr.reduce((sum, item) => (sum += item.price * item.count), 0)
}

export const getTotalProducts = (arr: IProduct[]) => {
  return arr.reduce((count, item) => (count += item.count), 0)
}

export const validateCardNumber = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (isNaN(Number(str[i]))) {
      str = str.slice(0, i)
    }
    if (str.length === 4 || str.length === 9 || str.length === 14) {
      str += ' '
    }
  }

  if (str.length > 19) {
    return str.slice(0, 19)
  }

  return str
}

export const validateExpireDate = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (isNaN(Number(str[i]))) {
      str = str.slice(0, i)
    }
    if (str.length === 2) {
      str += ' '
    }
  }

  if (str.length > 5) {
    return str.slice(0, 5)
  }

  return str
}

export const validateCvv = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (isNaN(Number(str[i]))) {
      str = str.slice(0, i)
    }
  }

  if (str.length > 3) {
    return str.slice(0, 3)
  }

  return str
}
