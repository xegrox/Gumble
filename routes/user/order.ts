import express from 'express'
import { identity } from 'lodash';
// import { Feedback } from 'models/feedback'
import { Order } from 'models/order'
import { OrderLine } from 'models/order_line';
import { Product } from 'models/product'

const router = express.Router();

function createDummyProduct() {
    // if (Product.length != 0) return;
    // Product.create({
    //     name: "dish name",
    //     description: "a dish",
    //     price: 10.00
    // })
}

router.get('/', async (req, res) => {
    createDummyProduct()
    console.log(await Product.findAll());
    res.render('user/order', {
        products: await Product.findAll(),
        orders: await Order.findAll(),
    })

});


router.post('/', async (req, res) => {
    console.log(req.body)
    let order = await Order.create({});
    for (var productID in req.body) {
        console.log(parseInt(req.body[productID]))
        for (var i = 0;i<parseInt(req.body[productID]); i++) {
            console.log("test")
            await OrderLine.create({
                order_id: order.id,
                product_id: parseInt(productID),
                status: 0
            })
        }
    }
    
    res.redirect('/user/order');
});

// router.put('/', async (req, res) => {
//     var feedback = order.feedback
//     if (feedback == null) return
//     var content = req.body.content.trim();
//     feedback.rating = req.body.rating;
//     feedback.content = content.length === 0 ? null : content;
//     feedback.save();
//     res.set('HX-Redirect', '/feedback?updated=true');
//     res.send();
// })

router.delete('/', async (req, res) => {
    console.log("test")
    await (await Order.findByPk(req.body.id)).destroy()
    res.set('HX-Redirect', '/user/order');
    res.send();
})

export default router
