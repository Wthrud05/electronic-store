import React, { FC } from 'react'
import Register from '../../components/Auth/Register'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

const RegisterPage: FC = () => {
  return (
    <div className={styles.Profile}>
      <h1>Create an account</h1>
      <Register />
      <p>
        Already have an account? <Link to={'/login'}>Sign in</Link>
      </p>
    </div>
  )
}

export default RegisterPage
