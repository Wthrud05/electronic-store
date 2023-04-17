import React from 'react'
import Form from './Form'
import { useAppDispatch } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { setUser } from '../../redux/auth/slice'
import axios from 'axios'

type User = {
  email: string
  userName: string
}

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = (name: string, email: string, password: string) => {
    const auth = getAuth()

    const getUserName = async (
      url = 'https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users.json',
    ) => {
      const res = await fetch(url).then((data) => data.json())
      const users: User[] = Object.values(res)
      const targetUser = users.find((user) => user.email === email)

      if (targetUser) {
        name = targetUser.userName
      }
    }

    getUserName()

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            name,
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          }),
        )
        localStorage.setItem(
          'user',
          JSON.stringify({ name, email: user.email, token: user.refreshToken, id: user.uid }),
        )
        navigate('/profile')
      })
      .catch(() => alert('User was not found!'))
  }

  return <Form title={'Sing in'} handleClick={handleLogin} />
}

export default Login
