import React from 'react'
import styles from './NotAutorized.module.scss'
import notAuth from '../../assets/images/error.svg'
import { Link } from 'react-router-dom'

const NotAuthorized = () => {
  return (
    <div className={styles.NotAuth}>
      <img src={notAuth} alt="not-auth" />
      <p>You are not authorized!</p>
      <Link to={'/profile'}>Log In</Link>
    </div>
  )
}

export default NotAuthorized
