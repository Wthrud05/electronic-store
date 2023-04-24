import { useAppSelector } from '../redux/store'

export const useAuth = () => {
  const { name, email, token, id } = useAppSelector((state) => state.auth)
  const isAuth = JSON.parse(localStorage.getItem('user') || '{}')

  return { isAuth, name, email, token, id }
}
