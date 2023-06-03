import React, { FC } from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/images/logo.png'
import Search from '../Search/Search'
import Navigation from '../Navigation/Navigation'
import { Link, useLocation } from 'react-router-dom'

const Header: FC = () => {
  const location = useLocation().pathname

  return (
    <div className={styles.Header}>
      <Link className={styles.Logo} to={'/electronic-store/'}>
        <img src={logo} alt="logo" />
      </Link>
      {location === '/electronic-store/' ? <Search /> : null}
      <Navigation />
    </div>
  )
}

export default Header
