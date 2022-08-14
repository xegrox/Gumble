import { Configuration } from "models/configuration"
import { OrderStatus } from "models/order_status"
import { Sequelize } from "sequelize-typescript"

export default (sequelize: Sequelize, drop: boolean = false) => {
  Configuration.afterSync(() => Configuration.create({}, {ignoreDuplicates: true}).then())
  OrderStatus.afterSync(() => OrderStatus.bulkCreate([
    {
      id: 0,
      description: 'pending'
    },
    {
      id: 1,
      description: 'ongoing'
    },
    {
      id: 2,
      description: 'done'
    }
  ], {ignoreDuplicates: true}).then())
  return sequelize.sync({force: drop})
}