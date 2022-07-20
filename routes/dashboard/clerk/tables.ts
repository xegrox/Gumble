import { Router } from "express"

const router = Router()

router.get('/', (req, res) => {
  res.render('dashboard/clerk/tables', {
    title: 'Tables'
  })
})

export default router