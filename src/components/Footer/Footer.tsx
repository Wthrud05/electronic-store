import React, { FC } from 'react'
import styles from './Footer.module.scss'
import github from '../../assets/images/github.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <Link target="_blank" to={'https://github.com/Wthrud05/electronic-store'}>
        <img src={github} alt="logo" />
      </Link>
      <span>Alexander Lobykin 2023</span>
    </div>
  )
}

export default Footer
