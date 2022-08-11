import { Router } from "express";
import { Configuration } from "models/configuration";

const router = Router()

router.get('/', async (req, res) => {
  let config = await Configuration.findOne()
  res.render('dashboard/admin/passwords', {
    title: 'Passwords',
    recovery_email: config.recovery_email
  })
})

router.post('/recovery_email', async (req, res) => {
  let config = await Configuration.findOne()
  config.recovery_email = req.body.email
  await config.save()
  res.redirect('/dashboard/admin/passwords')
})

export default router