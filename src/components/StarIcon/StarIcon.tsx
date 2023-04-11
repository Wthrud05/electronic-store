import React, { FC } from 'react'
import styles from './StarIcon.module.scss'

interface StartIconProps {
  src: string
}

const StarIcon: FC<StartIconProps> = ({ src }) => {
  return (
    <div className={styles.StarIcon}>
      <img src={src} alt="icon" />
    </div>
  )
}

export default StarIcon
