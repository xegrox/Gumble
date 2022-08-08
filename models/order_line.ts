import { BelongsTo, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Order } from './order'
import { OrderStatus } from './order_status'
import { Product } from './product'

@Table
export class OrderLine extends Model {
  @BelongsTo(() => Product)
  product: Product

  @BelongsTo(() => Order)
  order: Order

  @ForeignKey(() => OrderStatus)
  status: number

  @ForeignKey(() => Product)
  product_id: number

  @ForeignKey(() => Order)
  order_id: number
}