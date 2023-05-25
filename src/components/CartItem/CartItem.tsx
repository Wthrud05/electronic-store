import React, { FC, useEffect } from 'react'
import { IProduct } from '../../redux/products/types'
import styles from './CartItem.module.scss'
import minus from '../../assets/images/minus.svg'
import plus from '../../assets/images/plus.svg'
import cross from '../../assets/images/cross.svg'
import { RootState, useAppDispatch } from '../../redux/store'
import { deleteCartItem, removeCartItem, setCartItem } from '../../redux/userData/slice'
import { updateCartItems } from '../../helpers'
import { useSelector } from 'react-redux'

interface CartItemProps {
  cartItem: IProduct
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const dispatch = useAppDispatch()

  const addItemHandler = () => {
    dispatch(setCartItem(cartItem))
  }

  const removeItemHandler = () => {
    dispatch(removeCartItem(cartItem.id))
  }

  const deleteItemHandler = () => {
    dispatch(deleteCartItem(cartItem))
  }

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
          <button onClick={removeItemHandler}>
            <img src={minus} alt="minus" />
          </button>
          <span>{cartItem.count}</span>
          <button onClick={addItemHandler}>
            <img src={plus} alt="plus" />
          </button>
        </div>
      </div>
      <button onClick={deleteItemHandler} className={styles.CartItemDelete}>
        <img src={cross} alt="cross" />
      </button>
    </div>
  )
}

export default CartItem
