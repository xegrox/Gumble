import {Router} from 'express'

const router = Router()

router.get('/', async(req, res) => {
    res.render('dashboard/kitchen/product', {title: 'Product'})
})

export default router;

