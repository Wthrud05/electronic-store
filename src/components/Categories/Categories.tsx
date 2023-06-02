import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './Categories.module.scss'
import { categories } from '../../data/data'
interface CategoryProps {
  category: string
  onCategoryChange: (category: string) => void
}

const Categories: FC<CategoryProps> = ({ category, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const categoryRef = useRef<HTMLLIElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        event.target !== categoryRef.current &&
        event.target !== buttonRef.current &&
        event.target !== spanRef.current
      ) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const categoryHandler = (cat: string) => {
    onCategoryChange(cat)
    setIsOpen(false)
  }

  return (
    <div className={styles.Categories}>
      <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        Categories{' '}
        <span ref={spanRef} style={isOpen ? { transform: 'rotate(180deg)' } : {}}>
          ▼
        </span>
      </button>
      <ul className={isOpen ? styles.Open : ''}>
        {categories.map((cat, index) => (
          <li
            ref={categoryRef}
            className={category === cat ? styles.active : ''}
            onClick={() => categoryHandler(cat)}
            key={index}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
