import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const FavoritesPage: FC = () => {
  return (
    <div>
      <h1>FavoritesPage</h1>
      <Link to={'/profile'}>Back</Link>
    </div>
  )
}

export default FavoritesPage
