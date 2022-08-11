import { Router } from "express";
import p from 'path'

const router = Router()

router.use('/', (req, res, next) => {
  res.locals.layout = 'dashboard'
  return next()
})

router.use('/admin', require('./admin').default)
router.use('/clerk', require('./clerk').default)
router.use('/kitchen', require('./kitchen').default)
router.use('/session', require('./session').default)
router.use('/reset_password', require('./reset_password').default)

router.get('/', (req, res) => {
  if (req.isAuthenticated()) res.redirect(p.join(req.baseUrl, req.user as string, 'default').replace(/\\/g, '/'))
  else res.render('dashboard/login', {layout: 'main'})
})

export default router
