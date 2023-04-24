import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Favorite } from '../../redux/user/types'
import styles from './FavoritesPage.module.scss'
import icon from '../../assets/images/heart-green.svg'
import FavoriteItem from '../../components/FavoriteItem/FavoriteItem'
import FavoritePageLoader from '../../components/Skeleton/FavoritePageLoader'
import { setFavorites } from '../../redux/user/slice'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'

const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch()
  const favorites = useSelector((state: RootState) => state.user.userFavorites)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

    const getFavs = async () => {
      const res = await fetch(
        `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.key}/uFavorites.json`,
      )
      const data = await res.json()

      if (data !== null) {
        dispatch(setFavorites(data))
      }
      setIsLoading(false)
    }

    getFavs()
  }, [])

  const loaders = new Array(5).map((_, i) => <FavoritePageLoader key={i} />)

  console.log(favorites)

  return (
    <div className={styles.FavoritesPage}>
      <div className={styles.FavoritesPageHeader}>
        <img src={icon} alt="favorites page" />
        <h1>Favorites</h1>
        <Link to={'/profile'}>Back</Link>
      </div>
      {isLoading ? (
        loaders
      ) : (
        <ul>
          {favorites?.map((fav) => (
            <FavoriteItem key={fav.name} {...fav} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default FavoritesPage
