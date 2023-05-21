import React, { FC, useEffect, useState } from 'react'
import styles from './ProductPage.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { setProduct } from '../../redux/product/slice'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import star from '../../assets/images/star.svg'
import StarIcon from '../../components/StarIcon/StarIcon'
import { IProduct } from '../../redux/products/types'
import Button from '../../components/Button/Button'

const ProductPage: FC = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [image, setImage] = useState<string | undefined>('')

  const navigate = useNavigate()
  const { id } = useParams()
  const pId = id?.slice(1)

  const product = useSelector((state: RootState) => state.product.product)

  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/products/${pId}.json`,
      )
      .then((res) => {
        dispatch(setProduct(res.data))
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const color = product.images

    if (color.black) {
      setImage(product.images.black)
    } else {
      setImage(product.images.white)
    }
  }, [product])

  const productRating = [...new Array(product.rating)].map((_, i) => (
    <StarIcon key={i} src={star} />
  ))

  const chooseColorHander = (color: string) => {
    // @ts-ignore
    setImage(product.images[color])
  }

  const back = () => {
    navigate('/')
  }

  return (
    <>
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        <div className={styles.Product}>
          <a onClick={back} className={styles.ProductBack}>
            Back
          </a>
          <div className={styles.ProductImg}>
            <img src={image} alt="product" />
          </div>
          <div className={styles.ProductInfo}>
            <h1>{product.name}</h1>
            <p>Best device special for you</p>
            <div className={styles.ProductRating}>{productRating}</div>
            <div className={styles.ProductPrice}>
              <b>{product.price} $</b>
            </div>
            <div className={styles.ProductColors}>
              <span>Color:</span>
              <div className={styles.ProductColorsWrapper}>
                {product.colors?.map((color) => (
                  <div
                    onClick={() => chooseColorHander(color)}
                    key={color}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
            <div className={styles.ProductCharacteristics}>
              <span>Characteristics:</span>
              <ul>
                {product.characteristics?.map((ch) => (
                  <li key={ch.name}>
                    <b>{ch.name}</b> - {ch.value}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.ProductBtn}>
              <button className={styles.ProductBtnsBuy}>Buy now</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductPage
