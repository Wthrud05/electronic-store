import React, { FC } from 'react'
import styles from './FavoriteItem.module.scss'
import Button from '../Button/Button'
import redheart from '../../assets/images/red-heart.svg'
import { removeFavorite } from '../../redux/userData/slice'
import { RootState, useAppDispatch } from '../../redux/store'
import { updateFavorites } from '../../helpers'
import { useSelector } from 'react-redux'

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
  const dispatch = useAppDispatch()

  // const removeFromFavoriteHandler = (id: string) => {
  //   dispatch(removeFavorite(id))
  // }

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
        <Button title="Add to cart" fontSize="12px" width="100px" height="30px" />
      </div>
    </div>
  )
}

export default FavoriteItem
