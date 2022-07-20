import { Router } from "express";
import { ensureAuthAdmin } from "helpers/auth";

const router = Router()

router.use('/', ensureAuthAdmin)
router.use('/', (req, res, next) => {
  res.locals.navitems = [
    {
      icon: 'chart-line',
      name: 'Sales',
      url: 'sales'
    },
    {
      icon: 'message-2',
      name: 'Feedbacks',
      url: 'feedbacks'
    },
    {
      icon: 'palette',
      name: 'Appearance',
      url: 'appearance'
    },
    {
      icon: 'lock',
      name: 'Passwords',
      url: 'passwords'
    }
  ]
  return next()
})

router.get('/default', (req, res) => res.redirect('feedbacks'))
router.use('/feedbacks', require('./feedbacks').default)
router.use('/appearance', require('./appearance').default)

export default router