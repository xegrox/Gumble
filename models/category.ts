import { AllowNull, Column, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "./dashboard/kitchen/Product";

@Table
export class Category extends Model {
    @AllowNull(false) @Column
    category: string

    @HasMany(() => Product)
    product : Product
}
