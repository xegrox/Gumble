import { Router } from "express";
import * as TableUids from 'helpers/table_uids'
import { Table } from 'models/table'

const router = Router()

router.use('/dashboard', require('./dashboard').default);

router.get('/table/:table_no', async (req, res) => {
  let table = await Table.findByPk(req.params.table_no)
  if (!table) return res.sendStatus(404)
  let uid = await TableUids.getTableUid(req.params.table_no)
  res.redirect('/user/' + uid + '/order')
})

// For development only; comment this on actual presentation
router.use('/user', (req, res, next) => {
  req['table_no'] = 1
  next()
}, require('./user').default)

router.use('/user/:uid', (req, res, next) => {
  if (!TableUids.hasTableUid(req.params.uid)) return res.sendStatus(404)
  req['table_no'] = TableUids.getTableNo(req.params.uid)
  next()
}, require('./user').default);

export default router