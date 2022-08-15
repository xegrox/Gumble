import {Router} from 'express'
import {Product} from 'models/product'
import {Category} from 'models/category'

const router = Router()

router.get('/', async(req, res) => {
    res.render('dashboard/kitchen/product', {
        title: 'Product',
        products: await Product.findAll({ where: { category_id: req.query.category ?? 1 } }),
        categories: await Category.findAll(),
    })
    console.log(await Product.findAll({raw: true}))
})

router.post('/', async (req, res) =>{
     await Product.create({
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        category_id: req.body.category,   
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
        category_id: req.body.category,
    })
    res.redirect('/dashboard/kitchen/product')
})

router.post('/delete/:id', async (req, res) =>{
    var product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.redirect('/dashboard/kitchen/product')
})

router.post('/category/delete/:id', async (req, res) =>{
    var category = await Category.findByPk(req.params.id)
    await category.destroy()
    res.redirect('/dashboard/kitchen/product')
})

export default router;
