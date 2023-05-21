import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { removeUser, setUser } from '../../redux/auth/slice'
import { RootState, useAppDispatch } from '../../redux/store'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import orders from '../../assets/images/orders.svg'
import favorites from '../../assets/images/heart-green.svg'
import { useSelector } from 'react-redux'
import { fetchUserData, setCurrUser } from '../../redux/user/slice'
import { setUserData, setFavorites } from '../../redux/userData/slice'
import profile from '../../assets/images/profile.svg'
import PageHeader from '../../components/PageHeader/PageHeader'

const ProfilePage: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isAuth, name, email } = useAuth()

  const userLocal = JSON.parse(localStorage.getItem('user') || '{}')
  const uemail: string = userLocal.email

  const userData = useSelector((state: RootState) => state.userData.data)
  const user = useSelector((state: RootState) => state.currentUser.currentUser)

  const handleLogOut = () => {
    navigate('/login')
    dispatch(removeUser())
    localStorage.removeItem('user')
    dispatch(setFavorites([]))
    dispatch(setCurrUser({}))
    dispatch(setUserData({}))
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth])

  useEffect(() => {
    if (uemail) {
      dispatch(fetchUserData(uemail))
    }
  }, [])

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

  return (
    <div className={styles.Profile}>
      <PageHeader name="Profile" path={'/'} icon={profile} />
      <div className={styles.Profile_Img}>A</div>
      <div className={styles.Profile_Info}>
        <h2>{name}</h2>
        <span>{email}</span>
      </div>
      <div className={styles.Profile_Chapters}>
        <Link to={'/profile/orders'}>
          <img src={orders} alt="orders" />
          <span>Orders</span>
        </Link>
        <Link to={'/profile/favorites'}>
          <img src={favorites} alt="favorites" />
          <span>Favorites</span>
        </Link>
      </div>
      <button onClick={() => handleLogOut()}>Sign out</button>
    </div>
  )
}

export default ProfilePage
