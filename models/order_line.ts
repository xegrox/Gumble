import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Order } from './order'
import { Product } from './product'

@Table
export class OrderLine extends Model {
  @BelongsTo(() => Product)
  product: Product

  @BelongsTo(() => Order)
  order: Order

  @AllowNull(false) @Column
  status: number

  @ForeignKey(() => Product)
  product_id: number

  @ForeignKey(() => Order)
  order_id: number
}