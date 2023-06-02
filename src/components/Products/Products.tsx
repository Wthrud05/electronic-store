import React, { FC, useEffect, useState } from 'react'
import styles from './Products.module.scss'
import okey from '../../assets/images/okey.svg'
import error from '../../assets/images/error.svg'

import Product from '../Product/Product'
import Modal from '../Modal/Modal'

import { IProduct } from '../../redux/products/types'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { updateFavorites } from '../../helpers'
import { Favorite } from '../../redux/user/types'
import { useAuth } from '../../hooks/useAuth'
import { addFavorite, removeFavorite } from '../../redux/userData/slice'

interface ProductsProps {
  products: IProduct[]
}

const Products: FC<ProductsProps> = ({ products }) => {
  const dispatch = useAppDispatch()
  const favorites = useSelector((state: RootState) => state.userData.favorites)
  const userData = useSelector((state: RootState) => state.userData.data)

  const { isAuth } = useAuth()

  const [isModal, setIsModal] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>('')
  const [modalLink, setModalLink] = useState<string>('')
  const [scrollProp, setScrollProp] = useState<number>(0)
  const [color, setColor] = useState<string>('')
  const [image, setImage] = useState<string>('')

  const addToFavoriteHandler = (product: Favorite) => {
    if (isAuth) {
      dispatch(addFavorite(product))
      setIsModal(true)
      setModalText('Added to favorites!')
      setModalLink('/profile/favorites')
      setImage(okey)

      setTimeout(() => {
        setIsModal(false)
        setModalText('')
        setModalLink('')
        setImage('')
      }, 3000)
    } else {
      setIsModal(true)
      setModalText('You are not authorized!')
      setColor('red')
      setImage(error)

      setTimeout(() => {
        setIsModal(false)
        setModalText('')
        setColor('')
        setImage('')
      }, 3000)
    }
  }

  const removeFromFavoriteHandler = (id: string) => {
    dispatch(removeFavorite(id))
  }

  useEffect(() => {
    updateFavorites(userData, favorites)
  }, [favorites])

  const onScroll = () => setScrollProp(window.scrollY)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      onScroll()
    })
  }, [])

  return (
    <div className={styles.Products}>
      <h1>All products</h1>
      <Modal
        image={image}
        scrollProp={scrollProp}
        title={modalText}
        isOpen={isModal}
        link={modalLink}
        color={color}
      />
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
