import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import CartPage from './pages/CartPage/CartPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ProductPage from './pages/ProductPage/ProductPage'
import OrdersPage from './pages/OrdersPage/OrdersPage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import LoginPage from './pages/ProfilePage/LoginPage'
import RegisterPage from './pages/ProfilePage/RegisterPage'
import PaymentPage from './pages/PaymentPage/PaymentPage'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/electronic-store/" element={<HomePage />} />
          <Route path="/electronic-store/cart" element={<CartPage />} />
          <Route path="/electronic-store/payment" element={<PaymentPage />} />
          <Route path="/electronic-store/profile" element={<ProfilePage />} />
          <Route path="/electronic-store/login" element={<LoginPage />} />
          <Route path="/electronic-store/register" element={<RegisterPage />} />
          <Route path="/electronic-store/product/:id" element={<ProductPage />} />
          <Route path="/electronic-store/profile/orders" element={<OrdersPage />} />
          <Route path="/electronic-store/profile/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
