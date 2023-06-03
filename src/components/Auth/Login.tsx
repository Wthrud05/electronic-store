import React from 'react'
import Form from './Form'
import { useAppDispatch } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { setUser } from '../../redux/auth/slice'
import axios from 'axios'

type User = {
  uData: {
    email: string
    id: string
    name: string
    token: string
  }
}

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = (name: string, email: string, password: string) => {
    const auth = getAuth()

    const getUserName = async () => {
      const { data } = await axios.get<User[]>(
        'https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users.json',
      )

      const users: User[] = Object.values(data)

      const targetUser = users.find((user) => user.uData.email === email)

      if (targetUser) {
        name = targetUser.uData.name
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
        navigate('/electronic-store/profile')
      })
      .catch(() => alert('User was not found!'))
  }

  return <Form title={'Sign in'} handleClick={handleLogin} />
}

export default Login
