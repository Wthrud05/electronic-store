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
// import { setCurrentUser, setFavorites } from '../../redux/user/slice'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useAuth } from '../../hooks/useAuth'
import axios from 'axios'
import { fetchUserData } from '../../redux/user/slice'
import { User } from '../../redux/user/types'
import { setFavorites, setUserData } from '../../redux/userData/slice'

const HomePage: FC = () => {
  const dispatch = useAppDispatch()
  const { products, status } = useSelector((state: RootState) => state.products)
  const { sort, category, search } = useSelector((state: RootState) => state.filters)

  const userLocal = JSON.parse(localStorage.getItem('user') || '{}')
  const email: string = userLocal.email

  const user = useSelector((state: RootState) => state.currentUser.currentUser)

  useEffect(() => {
    dispatch(fetchProducts({ sort, category, search }))
  }, [sort, category, search])

  // useEffect(() => {
  //   try {
  //     const loadUser = async () => {
  //       const useremail = await useLocalStorage()
  //       console.log(useremail)

  //       await getCurrentUser(useremail)

  //       const currentUser = await JSON.parse(localStorage.getItem('currentUser') || '{}')

  //       if (JSON.parse(localStorage.getItem('currentUser') || '{}') !== '{}') {
  //         dispatch(setCurrentUser(currentUser))
  //       } else throw new Error('Error to load user data')
  //     }
  //     loadUser()
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, [])

  // useEffect(() => {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  //   console.log(currentUser.key)

  //   if (JSON.stringify(currentUser) !== '{}' && JSON.stringify(currentUser) !== 'undefined') {
  //     const getFav = async () => {
  //       try {
  //         const res = await fetch(
  //           `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.key}/uFavorites.json`,
  //         )
  //         const data = await res.json()
  //         console.log(data)

  //         if (data === null) return

  //         dispatch(setFavorites(data))
  //       } catch (e: any) {
  //         console.log('No favorites in data base')
  //       }
  //     }
  //     getFav()
  //   }
  // }, [])

  // useEffect(() => {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  //   const key = currentUser.key
  //   console.log(key)

  //   const getFav = async () => {
  //     try {
  //       if (key !== '' && key !== undefined && key !== null) {
  //         const res = await axios.get(
  //           `https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users/${key}/uFavorites.json`,
  //         )
  //         const data = await res.data

  //         console.log(res.data)

  //         if (data === null) return

  //         dispatch(setFavorites(data))
  //       }
  //     } catch (e: any) {
  //       console.log('No favorites in data base')
  //     }
  //   }

  //   setTimeout(() => getFav(), 0)
  // }, [])

  useEffect(() => {
    dispatch(fetchUserData(email))
  }, [])

  useEffect(() => {
    let data
    let favorites

    for (let u in user) {
      data = { email: user[u].uData.email, name: user[u].uData.name, key: u }
      favorites = user[u].uFavorites
    }
    dispatch(setUserData(data))

    if (!favorites) {
      favorites = []
    } else {
      dispatch(setFavorites(favorites))
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
