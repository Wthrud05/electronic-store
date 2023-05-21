import React, { FC } from 'react'
import { useAuth } from '../../hooks/useAuth'
import PageHeader from '../../components/PageHeader/PageHeader'
import cart from '../../assets/images/cart.svg'

const CartPage: FC = () => {
  const { isAuth } = useAuth()

  return (
    <>
      {!isAuth ? (
        <h1>You are not authorized</h1>
      ) : (
        <div>
          <PageHeader name="Cart" path="/" icon={cart} />
        </div>
      )}
    </>
  )
}

export default CartPage
