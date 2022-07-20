import { AllowNull, Column, Default, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Feedback } from './feedback'
import { OrderLine } from './order_line'

@Table
export class Order extends Model {
  @AllowNull(false) @Default(DataTypes.NOW) @Column
  in_time: Date

  @Column
  out_time: Date

  @HasMany(() => OrderLine)
  order_lines: OrderLine[]

  @HasOne(() => Feedback)
  feedback: Feedback
}
