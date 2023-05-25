import { useAppSelector } from '../redux/store'

export const useAuth = () => {
  const { name, email } = JSON.parse(localStorage.getItem('user') || '{}')

  return { isAuth: !!email, name, email }
}
