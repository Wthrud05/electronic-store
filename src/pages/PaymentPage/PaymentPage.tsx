import React, { useEffect, useState } from 'react'
import styles from './PaymentPage.module.scss'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import PaymentSuccess from '../../components/Payment/PaymentSuccess'
import Payment from '../../components/Payment/Payment'
import { updateCartItems, updateOrders } from '../../helpers'
import Loader from '../../components/Payment/Loader'
import { useNavigate } from 'react-router-dom'
import { setCartItems, setOrder, setOrders, setUserData } from '../../redux/userData/slice'

const PaymentPage = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { productsCount, totalPrice, products } = useSelector((state: RootState) => state.payment)

  const userData = useSelector((state: RootState) => state.userData.data)
  const order = useSelector((state: RootState) => state.payment)
  const userOrders = useSelector((state: RootState) => state.userData.orders)
  const userCart = useSelector((state: RootState) => state.userData.cart)

  const user = useSelector((state: RootState) => state.currentUser.currentUser)

  const [isPaymentSucess, setIsPaymentSucess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (totalPrice === 0 && productsCount === 0) {
      navigate('/cart')
    }

    let data
    let orders

    for (let u in user) {
      data = { email: user[u].uData.email, name: user[u].uData.name, key: u }
      orders = user[u].uOrders
    }
    dispatch(setUserData(data))

    if (orders) {
      dispatch(setOrders(orders))
    }
  }, [])

  useEffect(() => {
    updateOrders(userData, userOrders)
  }, [userOrders])

  useEffect(() => {
    updateCartItems(userData, userCart)
  }, [userCart])

  console.log(userCart)

  const paymentHandler = () => {
    setIsLoading(true)
    dispatch(setOrder(order))
    dispatch(setCartItems([]))
    updateCartItems(userData, userCart)
    setTimeout(() => {
      setIsPaymentSucess(true)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className={styles.PaymentPage}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isPaymentSucess ? (
            <PaymentSuccess totalPrice={totalPrice} />
          ) : (
            <Payment
              handler={paymentHandler}
              products={products}
              productsCount={productsCount}
              totalPrice={totalPrice}
            />
          )}
        </>
      )}
    </div>
  )
}

export default PaymentPage
