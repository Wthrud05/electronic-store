import React, { FC, useState, useRef, useEffect } from 'react'
import styles from './Navigation..module.scss'
import { navigationData } from '../../data/data'
import NavItem from '../NavItem/NavItem'
import burger from '../../assets/images/burger.svg'

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ulRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const handler = (isOpen: boolean) => {
    setIsOpen(isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        event.target !== ulRef.current &&
        event.target !== buttonRef.current &&
        event.target !== imgRef.current
      ) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.Navigation}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.NavigationBurger}
      >
        <img ref={imgRef} src={burger} alt="burger" />
      </button>
      <ul className={isOpen ? styles.Open : ''} ref={ulRef}>
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
