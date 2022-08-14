import { AllowNull, Column, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "models/product";

@Table
export class Category extends Model {
    @AllowNull(false) @Column
    category: string

    @HasMany(() => Product)
    product : Product
}
