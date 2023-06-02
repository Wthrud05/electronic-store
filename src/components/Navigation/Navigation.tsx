import React, { FC, useEffect, useState } from 'react'
import styles from './Navigation..module.scss'
import { navigationData } from '../../data/data'
import NavItem from '../NavItem/NavItem'
import burger from '../../assets/images/burger.svg'

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handler = (isOpen: boolean) => {
    setIsOpen(isOpen)
  }

  return (
    <div className={styles.Navigation}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.NavigationBurger}>
        <img src={burger} alt="burger" />
      </button>
      <ul className={isOpen ? styles.Open : ''}>
        {navigationData.map((item) => (
          <NavItem
            handler={handler}
            isOpen={isOpen}
            key={item.title}
            icon={item.icon}
            title={item.title}
            page={item.page}
          />
        ))}
      </ul>
    </div>
  )
}

export default Navigation
