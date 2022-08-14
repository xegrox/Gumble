import { Router } from "express"
import { Table } from "models/table"

const router = Router()

router.get('/', async (req, res) => {
  res.render('dashboard/clerk/tables', {
    title: 'Tables',
    subelement: 'dashboard/clerk/tables_add_btn'
  })
})

router.post('/', async (req, res) => {
  if (await Table.findByPk(req.body.table_no)) return res.sendStatus(400)
  await Table.create({
    table_no: req.body.table_no,
    capacity: req.body.capacity
  })
  res.send()
})

router.post('/view', async (req, res) => {
  res.render('dashboard/clerk/tables_view', {
    layout: 'main',
    tables: (await Table.findAll()).map((table) => {
      table['order_url'] = `${req.protocol}://${req.get('host')}/table/${table.table_no}`
      return table
    })
  })
})

router.post('/delete/:table_no', async (req, res) => {
  let table = await Table.findByPk(req.params.table_no)
  await table.destroy()
  res.redirect('/dashboard/clerk/tables')
})

export default router