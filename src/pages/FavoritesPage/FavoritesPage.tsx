import React, { FC, useEffect, useState } from 'react'
import { Favorite } from '../../redux/user/types'
import styles from './FavoritesPage.module.scss'
import favorite from '../../assets/images/heart-green.svg'
import FavoriteItem from '../../components/FavoriteItem/FavoriteItem'
import FavoritePageLoader from '../../components/Skeleton/FavoritePageLoader'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { removeFavorite, setFavorites, setUserData } from '../../redux/userData/slice'
import { fetchUserData } from '../../redux/user/slice'
import axios from 'axios'
import { updateFavorites } from '../../helpers'
import PageHeader from '../../components/PageHeader/PageHeader'

const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch()

  const user = useSelector((state: RootState) => state.currentUser.currentUser)
  const userData = useSelector((state: RootState) => state.userData.data)
  const userFavorites = useSelector((state: RootState) => state.userData.favorites)

  const userLocal = JSON.parse(localStorage.getItem('user') || '{}')
  const uemail: string = userLocal.email

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const favorites = useSelector((state: RootState) => state.userData.favorites)

  const loadData = async () => {
    setIsLoading(true)
    if (!userData) {
      return
    }

    if (userData) {
      const key = userData.key
      const res = await axios.get<Favorite[]>(
        `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users/${key}/uFavorites.json`,
      )

      if (res.data === null) {
        setIsLoading(false)
        return
      }

      dispatch(setFavorites(res.data))
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (uemail) {
      dispatch(fetchUserData(uemail))
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [userData])

  useEffect(() => {
    let data
    let favorites

    for (let u in user) {
      data = { email: user[u].uData.email, name: user[u].uData.name, key: u }
      favorites = user[u].uFavorites
    }
    dispatch(setUserData(data))

    if (favorites) {
      dispatch(setFavorites(favorites))
    }
  }, [user])

  useEffect(() => {
    setIsLoading(true)
    updateFavorites(userData, favorites)
    // setFavors(favorites)
    setIsLoading(false)
  }, [favorites])

  console.log(favorites)

  const removeFromFavroite = (id: string) => {
    dispatch(removeFavorite(id))
  }

  const loaders = [...new Array(5)].map((_, i) => <FavoritePageLoader key={i} />)

  return (
    <div className={styles.FavoritesPage}>
      <PageHeader name="Favorites" path="/profile" icon={favorite} />
      {isLoading ? (
        <div className={styles.Loaders}>{loaders}</div>
      ) : (
        <ul>
          {favorites?.map((fav) => (
            <FavoriteItem removeFromFavorite={removeFromFavroite} key={fav.name} {...fav} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default FavoritesPage
