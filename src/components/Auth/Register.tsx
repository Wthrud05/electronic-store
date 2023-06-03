import React from 'react'
import Form from './Form'
import { useAppDispatch } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { setUser } from '../../redux/auth/slice'
import { postData } from '../../helpers'

const Register = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleRegister = (name: string, email: string, password: string) => {
    const auth = getAuth()

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const userData = {
          uData: { email, name, id: user.uid, token: user.refreshToken },
        }

        dispatch(setUser({ name, email: user.email, token: user.refreshToken, id: user.uid }))

        postData(
          'https://electronic-store-63ba3-default-rtdb.europe-west1.firebasedatabase.app/users.json',
          userData,
        )

        localStorage.setItem(
          'user',
          JSON.stringify({ name, email: user.email, token: user.refreshToken, id: user.uid }),
        )
        navigate('/electronic-store/profile')
      })
      .catch(() => alert('Error'))
  }

  return <Form title={'Create account'} handleClick={handleRegister} isRegister={true} />
}

export default Register
