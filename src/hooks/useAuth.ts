import { useAppSelector } from '../redux/store'

export const useAuth = () => {
  // const { name, email, token, id } = useAppSelector((state) => state.auth)
  const { name, email } = JSON.parse(localStorage.getItem('user') || '{}')

  return { isAuth: !!email, name, email }
}
