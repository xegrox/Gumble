import { Column, Table as T, Model, BelongsTo, ForeignKey, PrimaryKey } from 'sequelize-typescript';
import { Order } from './order'

@T
export class Table extends Model {
  @PrimaryKey @Column
  table_no: number

  @Column
  capacity: number

  @BelongsTo(() => Order)
  current_order: Order

  @ForeignKey(() => Order)
  current_order_id: number
}
