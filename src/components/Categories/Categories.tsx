import React, { FC } from 'react'
import styles from './Categories.module.scss'
import { categories } from '../../data/data'

const Categories: FC = () => {
  return (
    <div className={styles.Categories}>
      <ul>
        {categories.map((category, index) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
