import React, { FC, useEffect, useState } from 'react'
import styles from './HomePage.module.scss'
import Sale from '../../components/Sale/Sale'
import Categories from '../../components/Categories/Categories'
import Sort from '../../components/Sort/Sort'
import { useSelector } from 'react-redux'
import { SortParams, fetchProducts } from '../../redux/products/slice'
import { useAppDispatch, RootState } from '../../redux/store'
import HomePageLoader from '../../components/Skeleton/HomePageLoader'
import Products from '../../components/Products/Products'
import ErrorHome from './ErrorHome'
import { setCategory } from '../../redux/filters/slice'

const HomePage: FC = () => {
  const dispatch = useAppDispatch()
  const { products, status } = useSelector((state: RootState) => state.products)
  const { sort, category, search } = useSelector((state: RootState) => state.filters)

  useEffect(() => {
    dispatch(fetchProducts({ sort, category, search }))
  }, [sort, category, search])

  const onCategoryChange = (category: string) => {
    dispatch(setCategory(category))
  }

  const loaders = [...new Array(8)].map((_, i) => <HomePageLoader key={i} />)

  return (
    <div className={styles.Homepage}>
      <Sale />
      <div className={styles.Filters}>
        <Categories onCategoryChange={onCategoryChange} category={category} />
        <Sort sortType={sort} />
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
