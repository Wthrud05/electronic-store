import React, { FC } from 'react'
import styles from './PageHeader.module.scss'
import { Link } from 'react-router-dom'

interface PageHeaderProps {
  name: string
  path: string
  icon: string
}

const PageHeader: FC<PageHeaderProps> = ({ name, path, icon }) => {
  return (
    <div className={styles.PageHeader}>
      <img src={icon} alt="favorites page" />
      <h1 className={styles.PageHeaderTitle}>{name}</h1>
      <Link to={path}>Back</Link>
    </div>
  )
}

export default PageHeader
