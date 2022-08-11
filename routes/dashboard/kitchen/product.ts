import {Router} from 'express'
import {Product} from 'models/product'

const router = Router()

router.get('/', async(req, res) => {
    res.render('dashboard/kitchen/product', {
        title: 'Product',
        products: await Product.findAll(),
    })
})

router.post('/', async (req, res) =>{
    await Product.create({
        image: req.body.image,
        groupname: req.body.groupname, 
        name: req.body.name,
        price: req.body.price,   
    })
    res.redirect('/dashboard/kitchen/product') 
})

router.post('/:id', async (req, res) =>{
    var product = await Product.findByPk(req.params.id)
    await product.update({
        image: req.body.image,
        groupname: req.body.groupname,
        name: req.body.name,
        price: req.body.price,
    })
    res.redirect('/dashboard/kitchen/product')
})

router.post('/:id', async (req, res) =>{
    await Category.create({
        category: req.body.category,
    })
    res.redirect('/dashboard/kitchen/product/category')
})

export default router;

