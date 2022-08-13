import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { OrderLine } from "./order_line";
import { Category } from "./category";

@Table
export class Product extends Model {
  @AllowNull(false) @Column
  name: string

  @AllowNull(false) @Column
  price: number
  
  @Column
  image: Buffer

  @HasMany(() => OrderLine)
  order_lines: OrderLine[]

  @BelongsTo(() => Category)
  category: Category

  @ForeignKey(() => Category)
  category_id: number
}

