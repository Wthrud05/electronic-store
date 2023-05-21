import React, { FC } from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/images/logo.png'
import Search from '../Search/Search'
import Navigation from '../Navigation/Navigation'
import { Link, useLocation } from 'react-router-dom'

const Header: FC = () => {
  return (
    <div className={styles.Header}>
      <Link className={styles.Logo} to={'/'}>
        <img src={logo} alt="logo" />
      </Link>
      <Navigation />
    </div>
  )
}

export default Header
