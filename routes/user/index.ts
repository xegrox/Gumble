import { Router } from "express";

const router = Router()

router.use('/feedback', require('./feedback').default)

export default router