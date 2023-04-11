import React, { FC, useEffect } from 'react'
import styles from './Products.module.scss'
import Product from '../Product/Product'
import { IProduct } from '../../redux/products/types'

interface ProductsProps {
  products: IProduct[]
}

const Products: FC<ProductsProps> = ({ products }) => {
  return (
    <div className={styles.Products}>
      <h1>All products</h1>
      <div className={styles.ProductsContent}>
        {products.map((product) => (
          <Product key={product.name} {...product} />
        ))}
      </div>
    </div>
  )
}

export default Products
