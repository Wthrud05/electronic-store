import React, { FC } from 'react'
import styles from './Categories.module.scss'
import { categories } from '../../data/data'
import { useSelector } from 'react-redux'

interface CategoryProps {
  category: string
  onCategoryChange: (category: string) => void
}

const Categories: FC<CategoryProps> = ({ category, onCategoryChange }) => {
  return (
    <div className={styles.Categories}>
      <ul>
        {categories.map((cat, index) => (
          <li
            className={category === cat ? styles.active : ''}
            onClick={() => onCategoryChange(cat)}
            key={cat}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
