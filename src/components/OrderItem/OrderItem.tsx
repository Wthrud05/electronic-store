import React, { FC } from 'react'
import { Order } from '../../redux/userData/types'
import styles from './OrderItem.module.scss'

interface OrderItemProps {
  order: Order
  orderNum: number
}

const OrderItem: FC<OrderItemProps> = ({ order, orderNum }) => {
  return (
    <div className={styles.OrderItem} key={order.totalPrice}>
      <span>№{orderNum + 1}</span>
      <ul>
        {order.products.map((product) => (
          <li key={product.name}>
            {/* 
              // @ts-ignore */}
            <img src={product.images[product.choosenColor]} alt="" /> {product.name}
          </li>
        ))}
      </ul>
      <div className={styles.OrderItemTotal}>
        <p>
          Price: <span>{order.totalPrice} $</span>
        </p>
        <p>
          Products: <span>{order.productsCount}</span>
        </p>
      </div>
    </div>
  )
}

export default OrderItem
