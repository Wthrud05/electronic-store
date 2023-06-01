import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState, useAppDispatch } from '../../redux/store'
import { setUserData, setOrders } from '../../redux/userData/slice'
import { fetchUserData } from '../../redux/user/slice'
import OrderItem from '../../components/OrderItem/OrderItem'
import PageHeader from '../../components/PageHeader/PageHeader'
import ordersIcon from '../../assets/images/orders.svg'

const OrdersPage: FC = () => {
  const dispatch = useAppDispatch()

  const user = useSelector((state: RootState) => state.currentUser.currentUser)
  const orders = useSelector((state: RootState) => state.userData.orders)

  console.log(orders)

  const userLocal = JSON.parse(localStorage.getItem('user') || '{}')
  const uemail: string = userLocal.email

  useEffect(() => {
    if (uemail) {
      dispatch(fetchUserData(uemail))
    }
  }, [])

  useEffect(() => {
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
  }, [user])

  return (
    <div>
      <PageHeader name="Orders" path="/profile" icon={ordersIcon} />
      {orders.length ? (
        <>
          {orders.map((order, i) => (
            <OrderItem key={i} orderNum={i} order={order} />
          ))}
        </>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  )
}

export default OrdersPage
