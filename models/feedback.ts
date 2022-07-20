import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "./order";

@Table
export class Feedback extends Model {
  @AllowNull(false) @Column
  rating: number

  @AllowNull(false) @Column
  content: string

  @BelongsTo(() => Order)
  order: Order

  @ForeignKey(() => Order)
  order_id: number
}