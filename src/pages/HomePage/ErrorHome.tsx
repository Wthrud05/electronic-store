import React from 'react'
import errorFace from '../../assets/images/error-face.png'
import styles from './ErrorHome.module.scss'

const Error = () => {
  return (
    <div className={styles.ErrorHome}>
      <h1>An error occurred while loading the page</h1>
      <img src={errorFace} alt="error" />
      <p>Try reloading the page</p>
    </div>
  )
}

export default Error
