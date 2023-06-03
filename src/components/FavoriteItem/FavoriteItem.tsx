import React, { FC } from 'react'
import styles from './FavoriteItem.module.scss'
import Button from '../Button/Button'
import redheart from '../../assets/images/red-heart.svg'

interface FavoriteItemProps {
  id: string
  name: string
  price: number
  images: {
    black?: string
    white?: string
  }
  removeFromFavorite: (id: string) => void
}

const FavoriteItem: FC<FavoriteItemProps> = ({ id, name, price, images, removeFromFavorite }) => {
  return (
    <div className={styles.FavoriteItem}>
      <div className={styles.FavoriteItemImage}>
        <button onClick={() => removeFromFavorite(id)} className={styles.Like}>
          <img src={redheart} alt="like" />
        </button>
        <img src={images.black ? images.black : images.white} alt={'favorite item ' + id} />
      </div>
      <div className={styles.FavoriteItemInfo}>
        <span>{price} $</span>
        <p>{name}</p>
      </div>
    </div>
  )
}

export default FavoriteItem
