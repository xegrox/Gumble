import { Router } from "express";
import { ensureAuthKitchen } from "helpers/auth";

const router = Router()

router.use('/', ensureAuthKitchen)
router.use('/', (req, res, next) => {
  res.locals.navitems = [
    {
      icon: 'list',
      name: 'Orders',
      url: 'orders'
    },
    {
      icon: 'tools-kitchen-2',
      name: 'Food menu',
      url: 'invoices'
    }
  ]
  return next()
})

router.use('/default', (req, res) => res.redirect('orders'))
router.use('/orders', require('./orders').default)

export default router