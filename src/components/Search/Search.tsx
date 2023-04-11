import React, { FC } from 'react'
import search from '../../assets/images/search.svg'
import styles from './Search.module.scss'

const Search: FC = () => {
  return (
    <div className={styles.Search}>
      <input placeholder="Searh..." />
      <svg
        className={styles.Icon}
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.4172 19.2078L17.4508 15.2414C18.2703 14.0063 18.75 12.5273 18.75 10.9375C18.75 6.62969 15.2453 3.125 10.9375 3.125C6.62969 3.125 3.125 6.62969 3.125 10.9375C3.125 15.2453 6.62969 18.75 10.9375 18.75C12.5273 18.75 14.0063 18.2703 15.2414 17.4508L19.2078 21.4172C19.8172 22.0273 20.8078 22.0273 21.4172 21.4172C22.0273 20.807 22.0273 19.818 21.4172 19.2078ZM5.46875 10.9375C5.46875 7.92188 7.92188 5.46875 10.9375 5.46875C13.9531 5.46875 16.4062 7.92188 16.4062 10.9375C16.4062 13.9531 13.9531 16.4062 10.9375 16.4062C7.92188 16.4062 5.46875 13.9531 5.46875 10.9375Z"
          fill="black"
        />
      </svg>
    </div>
  )
}

export default Search
