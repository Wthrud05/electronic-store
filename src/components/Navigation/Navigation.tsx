import React, { FC } from 'react'
import styles from './Navigation..module.scss'
import { navigationData } from '../../data/data'
import NavItem from '../NavItem/NavItem'

const Navigation: FC = () => {
  return (
    <div className={styles.Navigation}>
      <ul>
        {navigationData.map((item) => (
          <NavItem key={item.title} icon={item.icon} title={item.title} page={item.page} />
        ))}
      </ul>
    </div>
  )
}

export default Navigation
