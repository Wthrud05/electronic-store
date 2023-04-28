import React, { FC } from 'react'
import styles from './Modal.module.scss'
import { Link } from 'react-router-dom'

interface ModalProps {
  title: string
  link?: string | any
  isOpen?: boolean
  scrollProp: number
  color: string
  image: string
}

const Modal: FC<ModalProps> = ({ title, link, isOpen, scrollProp, color, image }) => {
  return (
    <div
      style={isOpen ? { top: `${scrollProp + 70}px`, opacity: '1', borderColor: `${color}` } : {}}
      className={styles.Modal}
    >
      <div className={styles.ModalHeader}>
        <img src={image} alt="modal-icon" />
        <span>{title}</span>
      </div>

      <Link to={link}>{link !== '' ? <span>Favorites</span> : null}</Link>
    </div>
  )
}

export default Modal
