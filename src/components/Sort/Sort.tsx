import React, { FC, useState, useEffect, useRef } from 'react'
import styles from './Sort.module.scss'
import arrowDown from '../../assets/images/arrow-down.svg'
import { sortTypes } from '../../data/data'
import { useAppDispatch } from '../../redux/store'
import { setSortType } from '../../redux/filters/slice'

interface SortProps {
  sortType: string
}

const Sort: FC<SortProps> = ({ sortType }) => {
  const [isOpen, setIsOpen] = useState(false)
  const sortTypeRef = useRef<HTMLSpanElement>(null)

  const dispatch = useAppDispatch()

  const onClickSortTypeHandler = (type: string) => {
    dispatch(setSortType(type))
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (event.target !== sortTypeRef.current) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.Sort}>
      <div className={styles.SortLabel}>
        <b>Sort by:</b>
        <div onClick={() => setIsOpen(!isOpen)}>
          <span ref={sortTypeRef}>{sortType}</span>
          <img className={isOpen ? styles.Up : styles.Icon} src={arrowDown} alt="arrow" />
        </div>
      </div>

      {isOpen && (
        <div className={styles.SortPopap}>
          <ul>
            {sortTypes.map((type) => (
              <li onClick={() => onClickSortTypeHandler(type)} key={type}>
                {type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort
