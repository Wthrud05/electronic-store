export const useLocalStorage = () => {
  if (localStorage.getItem('user')) {
    const data = JSON.parse(localStorage.getItem('user') || '{}')

    const email = data.email
    return email
  }
}
