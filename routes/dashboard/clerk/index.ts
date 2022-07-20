import { Router } from "express";
import { ensureAuthClerk } from "helpers/auth";

const router = Router()

router.use('/', ensureAuthClerk)
router.use('/', (req, res, next) => {
  res.locals.navitems = [
    {
      icon: 'table',
      name: 'Tables',
      url: 'tables'
    },
    {
      icon: 'file-invoice',
      name: 'Invoices',
      url: 'invoices'
    }
  ]
  return next()
})

router.get('/default', (req, res) => res.redirect('tables'))
router.get('/tables', require('./tables').default)

export default router