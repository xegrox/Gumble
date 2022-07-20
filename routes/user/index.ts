import { Router } from "express";

const router = Router()

router.use('/feedback', require('./feedback').default)
router.use('/order', require('./order').default)

export default router