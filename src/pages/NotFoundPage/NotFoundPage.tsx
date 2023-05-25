import React, { FC } from 'react'
import styles from './NotFoundPage.module.scss'
import errorFace from '../../assets/images/error-face.png'
import { Link } from 'react-router-dom'

const NotFoundPage: FC = () => {
  return (
    <div className={styles.NotFound}>
      <img src={errorFace} alt="error" />
      <h1>Page not found</h1>
      <p>Sorry, but the requsted page is not found</p>
      <Link to={'/'}>Back to the shop</Link>
    </div>
  )
}

export default NotFoundPage
