import React, { FC } from 'react'
import { IProduct } from '../../redux/products/types'
import styles from './CartItem.module.scss'
import minus from '../../assets/images/minus.svg'
import plus from '../../assets/images/plus.svg'
import cross from '../../assets/images/cross.svg'

interface CartItemProps {
  cartItem: IProduct
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  return (
    <div className={styles.CartItem}>
      <div className={styles.CartItemInfo}>
        {/* 
      // @ts-ignore */}
        <img src={cartItem.images[cartItem.choosenColor]} alt="product-image" />
        <div className={styles.CartItemInfoText}>
          <h3>{cartItem.name}</h3>
          <span>{cartItem.type}</span>
        </div>
      </div>
      <div className={styles.CartItemPrice}>
        <h3>{cartItem.price} $</h3>
        <div>
          <button>
            <img src={minus} alt="minus" />
          </button>
          <span>{cartItem.count}</span>
          <button>
            <img src={plus} alt="plus" />
          </button>
        </div>
      </div>
      <button className={styles.CartItemDelete}>
        <img src={cross} alt="cross" />
      </button>
    </div>
  )
}

export default CartItem
