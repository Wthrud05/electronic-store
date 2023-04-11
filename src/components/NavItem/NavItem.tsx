import React, { FC } from 'react'
import styles from './NavItem.module.scss'
import { NavLink } from 'react-router-dom'

interface NavItemProps {
  icon: string
  title: string
  page: string
}

const NavItem: FC<NavItemProps> = ({ icon, title, page }) => {
  return (
    <li className={styles.NavItem}>
      <NavLink
        className={({ isActive }: any) => (isActive ? styles.Active : styles.NavLink)}
        to={page}
      >
        <img src={icon} alt={title} />
        <span>{title}</span>
      </NavLink>
    </li>
  )
}

export default NavItem
