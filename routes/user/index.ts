import { Router } from "express";

const router = Router()

router.use('/feedback', require('./feedback').default)
router.use('/order', require('./order').default)
router.use('/order_view', require('./orderview').default)

export default router