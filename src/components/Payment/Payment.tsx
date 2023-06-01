import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import styles from './Payment.module.scss'
import logo from '../../assets/images/headphones.svg'
import { IProduct } from '../../redux/products/types'
import { validateCardNumber, validateCvv, validateExpireDate } from '../../helpers'

interface PaymentProps {
  products: IProduct[]
  productsCount: number
  totalPrice: number
  handler: () => void
}

const Payment: FC<PaymentProps> = ({ products, productsCount, totalPrice, handler }) => {
  const [cardNumber, setCardNumber] = useState<string>('')

  const [expireDate, setExpireDate] = useState<string>('')

  const [cvv, setCvv] = useState<string>('')

  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  const cardNumberHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = validateCardNumber(e.target.value)
    setCardNumber(value)
  }

  const expireDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = validateExpireDate(e.target.value)
    setExpireDate(value)
  }

  const cvvHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = validateCvv(e.target.value)
    setCvv(value)
  }

  useEffect(() => {
    if (cardNumber.length === 19 && expireDate.length === 5 && cvv.length === 3) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
    }
  }, [cardNumber, expireDate, cvv])

  return (
    <div className={styles.Payment}>
      <h1>Payment details</h1>
      <div className={styles.PaymentInputs}>
        <label htmlFor="card-number">Credit Card Number</label>
        <input
          placeholder="•••• •••• •••• ••••"
          onChange={cardNumberHandler}
          value={cardNumber}
          id="card-number"
          type="text"
        />
        <div className={styles.PaymentInputsBottom}>
          <div>
            <label htmlFor="expire-date">Expire Date</label>
            <input
              placeholder="mm dd"
              onChange={expireDateHandler}
              value={expireDate}
              id="expire-date"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <input placeholder="•••" onChange={cvvHandler} value={cvv} id="cvv" type="text" />
          </div>
        </div>
      </div>

      <img src={logo} alt="logo" />

      <div className={styles.PaymentTotal}>
        <div>
          <p>Total Products</p>
          <span>{productsCount}</span>
        </div>
        <div>
          <p>Total Amount</p>
          <span>{totalPrice} $</span>
        </div>
        <button disabled={!isCompleted} onClick={() => handler()}>
          Make payment
        </button>
      </div>
    </div>
  )
}

export default Payment
