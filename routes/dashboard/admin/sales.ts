import { Router } from "express";
import { OrderLine } from "models/order_line";
import { Product } from "models/product";
import { Op } from 'sequelize'
import { Date } from 'sugar'

const router = Router()

function safeDate(date_str: string, default_str: string) {
  let date = new Date(date_str)
  return date?.isValid()?.raw && date_str ? date : new Date(default_str)
}

router.get('/', async (req, res) => {
  let startDate = safeDate(req.query.startDate as string, 'one year ago')
  let endDate = safeDate(req.query.endDate as string, 'one month ago')
  let months = startDate.monthsUntil(endDate.raw).raw
  let data = []
  for (let i = 0; i <= months; i++) {
    let start = new Date(startDate.raw.getTime()).addMonths(i).beginningOfMonth().beginningOfDay()
    let end = new Date(start.raw.getTime()).endOfMonth().endOfDay()
    let lines = await OrderLine.findAll({
      where: {
        'createdAt': {
          [Op.between]: [start.raw, end.raw]
        }   
      },
      include: {
        model: Product
      }
    })
    let sales = lines.reduce((acc, curr) => acc+ curr.product.price, 0)
    data.push({
      x: start.format('%B %Y').raw,
      y: sales
    })
  }
  res.render('dashboard/admin/sales', {
    title: 'Sales',
    startDate: startDate.format('%Y-%m'),
    endDate: endDate.format('%Y-%m'),
    data: JSON.stringify(data)
  })
})

export default router