import { AllowNull, Column, HasMany, Model, Table } from "sequelize-typescript";
import { OrderLine } from "./order_line";

@Table
export class Product extends Model {
  @AllowNull(false) @Column
  name: string

  @AllowNull(false) @Column
  description: string

  @AllowNull(false) @Column
  price: number

  @Column
  image: Buffer

  @HasMany(() => OrderLine)
  order_lines: OrderLine[]
}
