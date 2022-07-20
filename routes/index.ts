import { Router } from "express";

const router = Router()

router.use('/dashboard', require('./dashboard').default);
router.use('/user', require('./user').default);

export default router