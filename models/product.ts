import { AllowNull, Column, HasMany, Model, Table } from "sequelize-typescript";
import { OrderLine } from "./order_line";

@Table
export class Product extends Model {
  @AllowNull(false) @Column
  name: string

  @AllowNull(false) @Column
  price: number
  
  @AllowNull(false) @Column
  groupname: string

  @Column
  image: Buffer

  @HasMany(() => OrderLine)
  order_lines: OrderLine[]
}
