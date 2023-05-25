import React, { FC, useEffect, useState } from 'react'
import styles from './CartPage.module.scss'
import { useAuth } from '../../hooks/useAuth'
import PageHeader from '../../components/PageHeader/PageHeader'
import cart from '../../assets/images/cart.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useAppDispatch } from '../../redux/store'
import { fetchUserData } from '../../redux/user/slice'
import { setCartItems, setFavorites, setUserData } from '../../redux/userData/slice'
import CartItem from '../../components/CartItem/CartItem'
import { getTotalPrice, getTotalProducts } from '../../helpers'
import Button from '../../components/Button/Button'

const CartPage: FC = () => {
  const [items, setItems] = useState<any[]>([])
  const dispatch = useAppDispatch()

  const user = useSelector((state: RootState) => state.currentUser.currentUser)

  const userCart = useSelector((state: RootState) => state.userData.cart)

  const totalPrice = getTotalPrice(userCart)
  const totalProducts = getTotalProducts(userCart)

  const { isAuth } = useAuth()

  const userLocal = JSON.parse(localStorage.getItem('user') || '{}')
  const email: string = userLocal.email

  useEffect(() => {
    if (email) {
      dispatch(fetchUserData(email))
    }
  }, [])

  useEffect(() => {
    let data
    let cartItems

    for (let u in user) {
      data = { email: user[u].uData.email, name: user[u].uData.name, key: u }
      cartItems = user[u].uCart
    }
    dispatch(setUserData(data))

    if (cartItems) {
      dispatch(setCartItems(cartItems))
    }
  }, [user])

  if (!items) {
    return (
      <div>
        <PageHeader name="Cart" path="/" icon={cart} />
        <h1>Корзина пустая</h1>
      </div>
    )
  }

  return (
    <>
      {!isAuth ? (
        <h1>You are not authorized</h1>
      ) : (
        <div className={styles.Cart}>
          <PageHeader name="Cart" path="/" icon={cart} />
          <ul>
            {userCart.map((item: any) => {
              return (
                <li key={item.name + item.choosenColor}>
                  <CartItem cartItem={item} />
                </li>
              )
            })}
          </ul>
          <div className={styles.CartTotal}>
            <div>
              <p>
                Total price: <span>{totalPrice} $</span>
              </p>
              <p>
                Products: <span>{totalProducts}</span>
              </p>
            </div>
            <button>Make an order</button>
          </div>
        </div>
      )}
    </>
  )
}

export default CartPage
