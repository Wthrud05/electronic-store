import React, { FC } from 'react'
import styles from './Product.module.scss'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import star from '../../assets/images/star.svg'
import StarIcon from '../StarIcon/StarIcon'

interface ProductProps {
  id: string
  name: string
  price: number
  rating: number
  images: {
    black?: string
    white?: string
  }
}

const Product: FC<ProductProps> = ({ id, name, price, rating, images }) => {
  const productRating = [...new Array(rating)].map((_, i) => <StarIcon key={i} src={star} />)

  return (
    <div className={styles.Product}>
      <img src={images.black ? images.black : images.white} alt="product image" />

      <div className={styles.ProductInfo}>
        <div className={styles.Top}>
          <span>{name}</span>
          <b>{price} $</b>
        </div>
        <div className={styles.Rating}>{productRating}</div>
        <div className={styles.Bot}>
          <Button title="Add to cart" width="110px" height="30px" fontSize="13px" />
          <Link to={`/product/:${id}`}>Details</Link>
        </div>
      </div>
    </div>
  )
}

export default Product
