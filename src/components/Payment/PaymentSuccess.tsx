import React, { FC } from 'react'
import styles from './Payment.module.scss'
import success from '../../assets/images/success.svg'
import { Link } from 'react-router-dom'

interface PaymentSuccessProps {
  totalPrice: number
}

const PaymentSuccess: FC<PaymentSuccessProps> = ({ totalPrice }) => {
  return (
    <div className={styles.PaymentSuccess}>
      <img src={success} alt="success" />
      <h1>Payment successful!</h1>
      <h1 className={styles.PaymentSuccessPrice}>{totalPrice} $</h1>
      <Link to={'/'}>To shop</Link>
      <Link to={'/profile/orders'}>To orders</Link>
    </div>
  )
}

export default PaymentSuccess
