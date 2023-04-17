import { useAppSelector } from '../redux/store'

export const useAuth = () => {
  const { name, email, token, id } = useAppSelector((state) => state.user)

  return { isAuth: localStorage.getItem('user'), name, email, token, id }
}
