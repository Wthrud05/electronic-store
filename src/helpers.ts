import { IProduct } from './redux/products/types'

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
      console.log(c)
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
