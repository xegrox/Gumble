import { AllowNull, Column, Model, Table } from "sequelize-typescript"

@Table
export class OrderStatus extends Model {
  @AllowNull(false) @Column
  description: string
}