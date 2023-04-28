import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Favorite } from '../../redux/user/types'
import styles from './FavoritesPage.module.scss'
import icon from '../../assets/images/heart-green.svg'
import FavoriteItem from '../../components/FavoriteItem/FavoriteItem'
import FavoritePageLoader from '../../components/Skeleton/FavoritePageLoader'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { setFavorites, setUserData } from '../../redux/userData/slice'
import { fetchUserData } from '../../redux/user/slice'
import axios from 'axios'

const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.currentUser.currentUser)
  const userData = useSelector((state: RootState) => state.userData.data)

  const userLocal = JSON.parse(localStorage.getItem('user') || '{}')
  const uemail: string = userLocal.email

  const [favors, setFavors] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
      setFavors(res.data)
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
    let data

    for (let u in user) {
      data = { email: user[u].uData.email, name: user[u].uData.name, key: u }
    }
    dispatch(setUserData(data))
  }, [user])

  useEffect(() => {
    loadData()
  }, [userData])

  const loaders = [...new Array(5)].map((_, i) => <FavoritePageLoader key={i} />)

  return (
    <div className={styles.FavoritesPage}>
      <div className={styles.FavoritesPageHeader}>
        <img src={icon} alt="favorites page" />
        <h1>Favorites</h1>
        <Link to={'/profile'}>Back</Link>
      </div>
      {isLoading ? (
        <div className={styles.Loaders}>{loaders}</div>
      ) : (
        <ul>
          {favors?.map((fav) => (
            <FavoriteItem key={fav.name} {...fav} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default FavoritesPage
