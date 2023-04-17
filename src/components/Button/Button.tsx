import React, { FC } from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  title: string
  width?: string
  height?: string
  fontSize?: string
  onClick?: Function
}

const Button: FC<ButtonProps> = ({
  title,
  width = '220px',
  height = '60px',
  fontSize = '24px',
}) => {
  return (
    <button className={styles.Button} style={{ width: width, height: height, fontSize: fontSize }}>
      {title}
    </button>
  )
}

export default Button
