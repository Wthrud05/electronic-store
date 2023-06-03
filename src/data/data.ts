import shop from '../assets/images/shop.svg'
import profile from '../assets/images/profile.svg'
import cart from '../assets/images/cart.svg'

export const navigationData = [
  { icon: shop, title: 'Shop', page: '/electronic-store/' },
  { icon: profile, title: 'Profile', page: '/electronic-store/profile' },
  { icon: cart, title: 'Cart', page: '/electronic-store/cart' },
]

export const categories = ['All', 'Headphones', 'Clocks', 'Smart home', 'Accessories']

export const sortTypes = ['default', 'price', 'rating']
