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
import { setCategory } from '../../redux/filters/slice'
import { fetchUserData } from '../../redux/user/slice'
import { setFavorites, setUserData } from '../../redux/userData/slice'

const HomePage: FC = () => {
  const dispatch = useAppDispatch()
  const { products, status } = useSelector((state: RootState) => state.products)
  const { sort, category, search } = useSelector((state: RootState) => state.filters)

  const userLocal = JSON.parse(localStorage.getItem('user') || '{}')
  const email: string = userLocal.email

  const user = useSelector((state: RootState) => state.currentUser.currentUser)

  const userData = useSelector((state: RootState) => state.userData.data)

  useEffect(() => {
    dispatch(fetchProducts({ sort, category, search }))
  }, [sort, category, search])

  useEffect(() => {
    dispatch(fetchUserData(email))
  }, [])

  useEffect(() => {
    let data
    let favorites

    for (let u in user) {
      console.log(user[u].uData)
      data = { email: user[u].uData.email, name: user[u].uData.name, key: u }
      favorites = user[u].uFavorites
    }

    dispatch(setUserData(data))
    if (favorites) {
      dispatch(setFavorites(favorites))
    } else {
      dispatch(setFavorites([]))
    }
  }, [user])

  const onCategoryChange = (category: string) => {
    dispatch(setCategory(category))
  }

  const loaders = [...new Array(4)].map((_, i) => <HomePageLoader key={i} />)

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
