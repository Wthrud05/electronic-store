import React, { FC, useEffect, useState } from 'react'
import styles from './CartPage.module.scss'
import emptyCart from '../../assets/images/empty-cart.svg'
import { useAuth } from '../../hooks/useAuth'
import PageHeader from '../../components/PageHeader/PageHeader'
import cart from '../../assets/images/cart.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useAppDispatch } from '../../redux/store'
import { fetchUserData } from '../../redux/user/slice'
import { setCartItems, setUserData } from '../../redux/userData/slice'
import CartItem from '../../components/CartItem/CartItem'
import { getTotalPrice, getTotalProducts, updateCartItems } from '../../helpers'
import CartPageLoader from '../../components/Skeleton/CartPageLoader'
import { Link } from 'react-router-dom'

const CartPage: FC = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const user = useSelector((state: RootState) => state.currentUser.currentUser)

  const userCart = useSelector((state: RootState) => state.userData.cart)

  const userData = useSelector((state: RootState) => state.userData.data)

  const totalPrice = getTotalPrice(userCart)
  const totalProducts = getTotalProducts(userCart)

  const { isAuth } = useAuth()

  const userLocal = JSON.parse(localStorage.getItem('user') || '{}')
  const email: string = userLocal.email

  useEffect(() => {
    setLoading(true)
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
      setLoading(false)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    updateCartItems(userData, userCart)
  }, [userCart])

  return (
    <>
      {!isAuth ? (
        <h1>You are not authorized</h1>
      ) : (
        <div className={styles.Cart}>
          <PageHeader name="Cart" path="/" icon={cart} />
          {loading ? (
            <CartPageLoader />
          ) : (
            <>
              {userCart.length ? (
                <ul>
                  {userCart.map((item: any) => {
                    return (
                      <li key={item.name + item.choosenColor}>
                        <CartItem cartItem={item} />
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <ul className={styles.CartEmpty}>
                  <h1>
                    Your cart is <span>Empty!</span>
                  </h1>
                  <img src={emptyCart} alt="empty-cart" />
                </ul>
              )}
            </>
          )}
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
