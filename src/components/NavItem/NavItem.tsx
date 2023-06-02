import React, { FC } from 'react'
import styles from './NavItem.module.scss'
import { NavLink } from 'react-router-dom'

interface NavItemProps {
  icon: string
  title: string
  page: string
  isOpen: boolean
  handler: (isOpen: boolean) => void
}

const NavItem: FC<NavItemProps> = ({ icon, title, page, isOpen, handler }) => {
  return (
    <li className={styles.NavItem} onClick={() => handler(!isOpen)}>
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
