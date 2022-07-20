import { Table, Column, Model, PrimaryKey, Default, AllowNull } from 'sequelize-typescript'

const DEFAULT_PASS = '$2a$11$EUmWB/SRQ/oPONXs6gJAw.KvT2LGK9G//ipYHmMpKcaCsBoh5lKl2'

@Table
export class Configuration extends Model {
  @PrimaryKey @Default(0) @Column
  lock: number

  @AllowNull(false) @Default(DEFAULT_PASS) @Column
  admin_pass: string

  @AllowNull(false) @Default(DEFAULT_PASS) @Column
  clerk_pass: string

  @AllowNull(false) @Default(DEFAULT_PASS) @Column
  kitchen_pass: string
}