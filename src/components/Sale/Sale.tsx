import React, { FC } from 'react'
import styles from './Sale.module.scss'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import saleProduct from '../../assets/images/sale-product.png'

const Sale = () => {
  return (
    <div className={styles.Sale}>
      <div className={styles.SaleLeft}>
        <h1>Get -30% off on selected headphones</h1>
        <Link to={'/product/:1'}>Buy now</Link>
      </div>
      <div>
        <img src={saleProduct} alt="sale-product" />
      </div>
    </div>
  )
}

export default Sale
