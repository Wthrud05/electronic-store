import React, { FC, useEffect } from 'react'
import styles from './HomePage.module.scss'
import Sale from '../../components/Sale/Sale'
import Categories from '../../components/Categories/Categories'
import Sort from '../../components/Sort/Sort'
import { useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/products/slice'
import { useAppDispatch, RootState } from '../../redux/store'
import HomePageLoader from '../../components/Skeleton/HomePageLoader'
import Products from '../../components/Products/Products'
import ErrorHome from './ErrorHome'

const HomePage: FC = () => {
  const dispatch = useAppDispatch()
  const { products, status } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    console.log(status)

    dispatch(fetchProducts())
  }, [])

  console.log(status)

  const loaders = [...new Array(8)].map((_, i) => <HomePageLoader key={i} />)

  return (
    <div className={styles.Homepage}>
      <Sale />
      <div className={styles.Filters}>
        <Categories />
        <Sort />
      </div>
      {status === 'error' ? (
        <ErrorHome />
      ) : (
        <div>
          {status === 'loading' ? (
            <div className={styles.Loaders}>{loaders}</div>
          ) : (
            <Products products={products} />
          )}
        </div>
      )}
    </div>
  )
}

export default HomePage
