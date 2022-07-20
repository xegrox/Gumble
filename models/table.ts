import { Column, Table as T, HasOne, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Order } from './order'

@T
export class Table extends Model {
  @Column
  capacity: number

  @BelongsTo(() => Order)
  current_order: Order

  @ForeignKey(() => Order)
  current_order_id: number
}
