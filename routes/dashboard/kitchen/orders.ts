import { Router } from "express";
import { Order } from "models/order";
import { OrderLine } from "models/order_line";
import { Product } from "models/product";
import { Table } from "models/table";

const router = Router()

router.get('/', async (req, res) => res.render('dashboard/kitchen/orders', {
  title: 'Orders',
  subelement: 'dashboard/kitchen/orders_view_switch',
  priority: req.query.priority
}))

router.get('/view', async (req, res) => {
  let isPriorityView = false
  try { isPriorityView = JSON.parse(req.query.priority as string) } catch {}
  let view =  isPriorityView ? 'dashboard/kitchen/orders_priority_view' : 'dashboard/kitchen/orders_tables_view'
  res.render(view, {
    layout: false,
    tables: await Table.findAll({
      include: {
        model: Order,
        include: [{
          model: OrderLine,
          include: [{
            model: Product
          }]
        }]
      }
    })
  })
})

router.put('/status/:id', async (req, res) => {
  await OrderLine.update({
    status: req.body.status
  }, {
    where: {
      id: req.params.id
    }
  })
  res.sendStatus(200)
})

export default router