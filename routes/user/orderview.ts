import express from 'express'
import { Product } from 'models/product';


const router = express.Router();


router.post('/', async (req, res) => {
    for (var id in req.cookies) {
        res.clearCookie(id)
    }
    for (var id in req.body) {
        var quantity = req.body[id]
        res.cookie(id, quantity)
    }
    res.redirect('/user/order')
})


router.get('/', async (req, res) => {
    var Item = {} // Making object for storing attributes

    for (var id in req.cookies) {
        var product = await Product.findByPk(id) // Model from database
        Item[product.id] = {
            name: product.name,
            quantity: req.cookies[id],
        } // Attribute name with cookie value referencing quantity

    }
    res.render('user/order_view', {
        cart: Item
    })
})


router.post('/delete/:id', (req, res) => {
    res.clearCookie(req.params.id)
    console.log(req.params.id)
    console.log(res.cookie)
    res.redirect('/user/order_view')
})

export default router