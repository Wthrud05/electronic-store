import { IProduct } from '../products/types'

export interface PaymentState {
  products: IProduct[]
  productsCount: number
  totalPrice: number
}
