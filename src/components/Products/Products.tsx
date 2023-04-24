import React, { FC, useEffect, useRef } from 'react'
import styles from './Products.module.scss'
import Product from '../Product/Product'
import { IProduct } from '../../redux/products/types'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { putData } from '../../helpers'
import { setFavorite, removeFavorite } from '../../redux/user/slice'
import { Favorite } from '../../redux/user/types'
import axios from 'axios'

interface ProductsProps {
  products: IProduct[]
}

const Products: FC<ProductsProps> = ({ products }) => {
  const dispatch = useAppDispatch()
  const favorites = useSelector((state: RootState) => state.user.userFavorites)

  const favInxs = favorites?.map((fav) => fav?.id)
  const userKey = useSelector((state: RootState) => state.user.data.key)

  const updateFavorites = () => {
    const data = Object.assign({}, favorites)

    const url = `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users/${userKey}/uFavorites.json`

    if (JSON.stringify(data) !== '{}') {
      putData(url, data)
    }

    if (JSON.stringify(data) === '{}') {
      axios.delete(url)
    }
  }

  const addToFavoriteHandler = (product: Favorite) => {
    if (userKey) {
      favInxs?.includes(product.id) ? null : dispatch(setFavorite(product))
    } else {
      alert('You are not authorized!')
    }
  }

  const removeFromFavoriteHandler = (id: string) => {
    if (userKey) {
      favInxs?.includes(id) ? dispatch(removeFavorite(id)) : null
    } else {
      alert('You are not authorized!')
    }
  }

  useEffect(() => {
    updateFavorites()
  }, [favorites])

  return (
    <div className={styles.Products}>
      <h1>All products</h1>
      <div className={styles.ProductsContent}>
        {products.map((product) => (
          <Product
            addFav={addToFavoriteHandler}
            removeFav={removeFromFavoriteHandler}
            key={product.name}
            {...product}
          />
        ))}
      </div>
    </div>
  )
}

export default Products
