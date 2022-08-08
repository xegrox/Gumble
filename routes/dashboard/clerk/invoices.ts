import { Router } from "express";
import { reduce } from "lodash";
import { Order } from "models/order";
import { OrderLine } from "models/order_line";
import { Product } from "models/product";
import { Table } from "models/table";


const router = Router()

router.get('/', async (req, res) => {
  let tables = await Table.findAll({
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
  tables.forEach((table) => {
    if (!table.current_order) return
    let invoice = {products: {}, total: 0}
    let products = invoice.products
    invoice.total = reduce(table.current_order.order_lines, (acc, curr) => {
      products[curr.product.name] ??= {quantity: 0, price: curr.product.price}
      products[curr.product.name]['quantity']++;
      return acc + curr.product.price;
    }, 0);
    table['invoice'] = invoice
  })
  res.render('dashboard/clerk/invoices', {tables, title: 'Invoices'})
})

router.post('/clear/:id', async (req, res) => {
  let table = await Table.findByPk(req.params.id)
  table.current_order_id = null
  await table.save()
  res.redirect('/dashboard/clerk/invoices')
})

export default router