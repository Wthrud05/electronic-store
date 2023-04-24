import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'

const OrdersPage: FC = () => {
  return (
    <div>
      <h1>OrdersPage</h1>
      <Link to={'/profile'}> Back</Link>
    </div>
  )
}

export default OrdersPage
