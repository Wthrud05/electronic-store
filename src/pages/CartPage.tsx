import React, { FC } from 'react'
import { useAuth } from '../hooks/useAuth'

const CartPage: FC = () => {
  const { isAuth } = useAuth()

  return <div>{isAuth ? <h1>CartPage</h1> : <h1>You are not authorized</h1>}</div>
}

export default CartPage
