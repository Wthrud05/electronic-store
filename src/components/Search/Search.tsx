import React, { FC, useState, useRef, ChangeEvent, useCallback } from 'react'
import styles from './Search.module.scss'
import search from '../../assets/images/search.svg'
import close from '../../assets/images/close.svg'
import { useAppDispatch } from '../../redux/store'
import { setSearch } from '../../redux/filters/slice'
import { debounce } from 'lodash'

const Search: FC = () => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const updateInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    inputChangeHandler(e.target.value)
  }

  const inputChangeHandler = useCallback(
    debounce((str: string) => {
      dispatch(setSearch(str))
    }, 500),
    [],
  )

  const clearInputHandler = () => {
    dispatch(setSearch(''))
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <div className={styles.Search}>
      <input
        placeholder="Searh..."
        value={value}
        onChange={(e) => updateInputHandler(e)}
        ref={inputRef}
      />
      <img src={search} className={styles.Search} alt="search" />
      {value && (
        <img src={close} className={styles.Close} alt="close" onClick={clearInputHandler} />
      )}
    </div>
  )
}

export default Search
