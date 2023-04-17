import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { removeUser, setUser } from '../../redux/auth/slice'
import { useAppDispatch } from '../../redux/store'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import orders from '../../assets/images/orders.svg'
import favorites from '../../assets/images/heart-green.svg'

type IUser = {
  name: string
  email: string
  token: string
  id: string
}

const ProfilePage: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isAuth, name, email } = useAuth()
  const nameF = name?.charAt(0)

  const handleLogOut = () => {
    dispatch(removeUser())
    localStorage.removeItem('user')
    navigate('/login')
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }

    if (isAuth) {
      const user: IUser = JSON.parse(localStorage.getItem('user') || '{}')
      const { name, email, token, id } = user
      dispatch(setUser({ name, email, token, id }))
    }
  }, [isAuth])

  return (
    <div className={styles.Profile}>
      <div className={styles.Profile_Img}>{nameF}</div>
      <h2>{name}</h2>
      <div className={styles.Profile_Chapters}>
        <Link to={'/profile/orders'}>
          <img src={orders} alt="orders" /> Orders
        </Link>
        <Link to={'/profile/favorites'}>
          <img src={favorites} alt="favorites" /> Favorites
        </Link>
      </div>
      <button onClick={() => handleLogOut()}>Sign out</button>
    </div>
  )
}

export default ProfilePage
