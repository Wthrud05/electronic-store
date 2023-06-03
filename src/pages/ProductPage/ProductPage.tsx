import React, { FC, useEffect, useState } from 'react'
import styles from './ProductPage.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { setChoosenColor, setProduct } from '../../redux/product/slice'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import star from '../../assets/images/star.svg'
import StarIcon from '../../components/StarIcon/StarIcon'
import ProductPageLoader from '../../components/Skeleton/ProductPageLoader'
import { updateCartItems } from '../../helpers'
import { setCartItem } from '../../redux/userData/slice'
import { useAuth } from '../../hooks/useAuth'
import Modal from '../../components/Modal/Modal'
import mImage from '../../assets/images/error.svg'

const ProductPage: FC = () => {
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [image, setImage] = useState<string | undefined>('')
  const [color, setColor] = useState<string | undefined>('')

  const [isModal, setIsModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<string>('')
  const [scrollProp, setScrollProp] = useState<number>(0)
  const [modalText, setModalText] = useState<string>('')

  const { isAuth } = useAuth()

  const navigate = useNavigate()
  const { id } = useParams()
  const pId = id?.slice(1)

  const product = useSelector((state: RootState) => state.product.product)
  const userData = useSelector((state: RootState) => state.userData.data)
  const cartItems = useSelector((state: RootState) => state.userData.cart)

  const loadProductData = async () => {
    setLoading(true)
    const { data } = await axios.get(
      `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/products/${pId}.json`,
    )

    dispatch(setProduct(data))
    data.colors.includes('black')
      ? dispatch(setChoosenColor('black'))
      : dispatch(setChoosenColor('white'))
    setLoading(false)
  }

  useEffect(() => {
    loadProductData()
  }, [])

  useEffect(() => {
    const image = product.images

    product.choosenColor
      ? // @ts-ignore
        setImage(product.images[product.choosenColor])
      : image.black
      ? setImage(product.images.black)
      : setImage(product.images.white)
  }, [product])

  const onScroll = () => setScrollProp(window.scrollY)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      onScroll()
    })
  }, [])

  const productRating = [...new Array(product.rating)].map((_, i) => (
    <StarIcon key={i} src={star} />
  ))

  const chooseColorHander = (color: string) => {
    // @ts-ignore
    setImage(product.images[color])
    setColor(color)
    dispatch(setChoosenColor(color))
  }

  const back = () => {
    navigate('/electronic-store')
  }

  const addToCart = () => {
    if (!isAuth) {
      setModalImage(mImage)
      setIsModal(true)
      setModalText('You are not authorized!')

      setTimeout(() => {
        setIsModal(false)
        setModalImage('')
        setModalText('')
      }, 3000)
    } else {
      dispatch(setCartItem(product))
      setTimeout(() => {
        navigate('/electronic-store/cart')
      }, 100)
    }
  }

  useEffect(() => {
    updateCartItems(userData, cartItems)
  }, [cartItems])

  return (
    <>
      <Modal
        image={modalImage}
        color="red"
        isOpen={isModal}
        scrollProp={0}
        title={modalText}
        link={''}
      />
      {loading ? (
        <ProductPageLoader />
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
                    <b>{ch.name}&nbsp; </b>
                    <span>{ch.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.ProductBtn}>
              <button onClick={() => addToCart()} className={styles.ProductBtnsBuy}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductPage
