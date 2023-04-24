import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { removeUser, setUser } from '../../redux/auth/slice'
import { useAppDispatch } from '../../redux/store'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import orders from '../../assets/images/orders.svg'
import favorites from '../../assets/images/heart-green.svg'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { IUser } from '../../@types/types'
import { getCurrentUser } from '../../helpers'
import { setCurrentUser, setFavorites } from '../../redux/user/slice'

const ProfilePage: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isAuth, name, email } = useAuth()
  const nameF = name?.charAt(0)

  const handleLogOut = () => {
    dispatch(removeUser())
    localStorage.removeItem('user')
    localStorage.removeItem('userkey')
    localStorage.removeItem('currentUser')
    navigate('/login')
    dispatch(setFavorites([]))
    dispatch(
      setCurrentUser({
        key: '',
        name: '',
        email: '',
      }),
    )
  }

  useEffect(() => {
    if (JSON.stringify(isAuth) === '{}') {
      navigate('/login')
    }

    if (JSON.stringify(isAuth) !== '{}') {
      const user: IUser = JSON.parse(localStorage.getItem('user') || '{}')
      const { name, email, token, id } = user
      dispatch(setUser({ name, email, token, id }))
    }
  }, [isAuth])

  useEffect(() => {
    try {
      const loadUser = async () => {
        const useremail = await useLocalStorage()
        await getCurrentUser(useremail)

        const currentUser = await JSON.parse(localStorage.getItem('currentUser') || '{}')

        if (JSON.parse(localStorage.getItem('currentUser') || '{}') !== '{}') {
          dispatch(setCurrentUser(currentUser))
        } else throw new Error('Error to load user data')
      }
      loadUser()
    } catch (error: any) {
      console.log(error.message)
    }
  }, [isAuth])

  return (
    <div className={styles.Profile}>
      <div className={styles.Profile_Img}>{nameF}</div>
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
