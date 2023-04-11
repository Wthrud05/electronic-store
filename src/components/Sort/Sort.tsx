import React, { FC, useState } from 'react'
import styles from './Sort.module.scss'
import arrowDown from '../../assets/images/arrow-down.svg'
import { sortTypes } from '../../data/data'

const Sort: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.Sort}>
      <div className={styles.SortLabel}>
        <b>Sort by:</b>
        <div onClick={() => setIsOpen(!isOpen)}>
          <span>Price</span>
          <img src={arrowDown} alt="arrow" />
        </div>
      </div>

      {isOpen && (
        <div className={styles.SortPopap}>
          <ul>
            {sortTypes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort
