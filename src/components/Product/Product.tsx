import React, { FC } from 'react'
import styles from './Product.module.scss'
import { Link } from 'react-router-dom'
import star from '../../assets/images/star.svg'
import heart from '../../assets/images/heart.svg'
import redheart from '../../assets/images/red-heart.svg'
import StarIcon from '../StarIcon/StarIcon'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import { Favorite } from '../../redux/user/types'

interface ProductProps {
  id: string
  name: string
  price: number
  rating: number
  images: {
    black?: string
    white?: string
  }
  addFav: (product: Favorite) => void
  removeFav: (id: string) => void
}

const Product: FC<ProductProps> = ({ id, name, price, rating, images, addFav, removeFav }) => {
  const productRating = [...new Array(rating)].map((_, i) => <StarIcon key={i} src={star} />)

  const favorites = useSelector((state: RootState) => state.userData.favorites)
  const favInxs = favorites?.map((fav) => fav.id)

  return (
    <div className={styles.Product}>
      {favInxs?.includes(id) ? (
        <button onClick={() => removeFav(id)} className={styles.Like}>
          <img src={redheart} alt="like" />
        </button>
      ) : (
        <button onClick={() => addFav({ id, name, price, images })} className={styles.Like}>
          <img src={heart} alt="like" />
        </button>
      )}
      <img src={images.black ? images.black : images.white} alt="product image" />

      <div className={styles.ProductInfo}>
        <div className={styles.Top}>
          <span>{name}</span>
          <b>{price} $</b>
        </div>
        <div className={styles.Rating}>{productRating}</div>
        <div className={styles.Bot}>
          <Link to={`/product/:${id}`}>Add to cart</Link>
        </div>
      </div>
    </div>
  )
}

export default Product
