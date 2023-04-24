import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import CartPage from './pages/CartPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ProductPage from './pages/ProductPage'
import OrdersPage from './pages/OrdersPage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import LoginPage from './pages/ProfilePage/LoginPage'
import RegisterPage from './pages/ProfilePage/RegisterPage'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile/orders" element={<OrdersPage />} />
          <Route path="/profile/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
