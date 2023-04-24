import React, { FC } from 'react'
import styles from './FavoriteItem.module.scss'
import Button from '../Button/Button'

interface FavoriteItemProps {
  id: string
  name: string
  price: number
  images: {
    black?: string
    white?: string
  }
}

const FavoriteItem: FC<FavoriteItemProps> = ({ id, name, price, images }) => {
  return (
    <div className={styles.FavoriteItem}>
      <div className={styles.FavoriteItemImage}>
        <img src={images.black ? images.black : images.white} alt={'favorite item ' + id} />
      </div>
      <div className={styles.FavoriteItemInfo}>
        <span>{price} $</span>
        <p>{name}</p>
        <Button title="Add to cart" fontSize="12px" width="100px" height="30px" />
      </div>
    </div>
  )
}

export default FavoriteItem
