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
import { setCurrentUser, setFavorites } from '../../redux/user/slice'
import { getCurrentUser } from '../../helpers'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useAuth } from '../../hooks/useAuth'

const HomePage: FC = () => {
  const dispatch = useAppDispatch()
  const { products, status } = useSelector((state: RootState) => state.products)
  const { sort, category, search } = useSelector((state: RootState) => state.filters)
  const { isAuth } = useAuth()

  useEffect(() => {
    dispatch(fetchProducts({ sort, category, search }))
  }, [sort, category, search])

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

    if (JSON.stringify(currentUser) !== '{}' && JSON.stringify(currentUser) !== 'undefined') {
      const getFav = async () => {
        try {
          const res = await fetch(
            `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.key}/uFavorites.json`,
          )
          const data = await res.json()

          if (data === null) return

          dispatch(setFavorites(data))
        } catch (e: any) {
          console.log('No favorites in data base')
        }
      }
      getFav()
    }
  }, [])

  useEffect(() => {
    if (!isAuth) {
      try {
        const loadUser = async () => {
          const useremail = await useLocalStorage()
          await getCurrentUser(useremail)

          const currentUser = await JSON.parse(localStorage.getItem('currentUser') || '{}')

          if (JSON.parse(localStorage.getItem('currentUser') || '{}') !== '{}') {
            dispatch(setCurrentUser(currentUser))
          } else throw new Error('Error to load user data')
        }
        loadUser()
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

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
