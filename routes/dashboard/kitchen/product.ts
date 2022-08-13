import {Router} from 'express'
import {Product} from 'models/product'
import {Category} from 'models/category'

const router = Router()

router.get('/', async(req, res) => {
    res.render('dashboard/kitchen/product', {
        title: 'Product',
        products: await Product.findAll(),
        categories: await Category.findAll(),
    })
    console.log(await Category.findAll())
})

router.post('/', async (req, res) =>{
     await Product.create({
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,   
    })
     res.redirect('/dashboard/kitchen/product') 
}) 

router.post('/category', async (req, res) =>{
    await Category.create({
        category: req.body.Category,
    })
    res.redirect('/dashboard/kitchen/product')
    Category.findAll({ where: { category: '{{category}}' } })
})

router.post('/product/update/:id', async (req, res) =>{
    var product = await Product.findByPk(req.params.id)
    await product.update({
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    })
    res.redirect('/dashboard/kitchen/product')
})

export default router;
        category: req.body.category,
    })
    res.redirect('/dashboard/kitchen/product/category')
})

export default router;

