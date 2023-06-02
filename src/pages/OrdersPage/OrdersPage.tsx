import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { setUserData, setOrders } from '../../redux/userData/slice'
import { fetchUserData } from '../../redux/user/slice'
import OrderItem from '../../components/OrderItem/OrderItem'
import PageHeader from '../../components/PageHeader/PageHeader'
import ordersIcon from '../../assets/images/orders.svg'
import OrdersPageLoader from '../../components/Skeleton/OrdersPageLoader'

const OrdersPage: FC = () => {
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState<boolean>(false)

  const user = useSelector((state: RootState) => state.currentUser.currentUser)
  const orders = useSelector((state: RootState) => state.userData.orders)

  const userLocal = JSON.parse(localStorage.getItem('user') || '{}')
  const uemail: string = userLocal.email

  useEffect(() => {
    if (uemail) {
      dispatch(fetchUserData(uemail))
    }
  }, [])

  useEffect(() => {
    setLoading(true)
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

    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [user])

  return (
    <div>
      <PageHeader name="Orders" path="/profile" icon={ordersIcon} />
      {loading ? (
        <OrdersPageLoader />
      ) : (
        <>
          {orders.map((order, i) => (
            <OrderItem key={i} orderNum={i} order={order} />
          ))}
        </>
      )}
    </div>
  )
}

export default OrdersPage
