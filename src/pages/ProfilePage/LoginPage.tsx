import React, { FC } from 'react'
import Login from '../../components/Auth/Login'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

const LoginPage: FC = () => {
  return (
    <div className={styles.Profile}>
      <h1>Sign in with email</h1>
      <Login />
      <p>
        Don't have an account yet?
        <Link to={'/register'}> register</Link>
      </p>
    </div>
  )
}

export default LoginPage
