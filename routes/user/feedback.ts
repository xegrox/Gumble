import express from 'express'
import { Feedback } from 'models/feedback'
import { Order } from 'models/order'

const router = express.Router();

let getDummyOrder = async () => await Order.findOne({include: Feedback}) ?? await Order.create()

router.get('/', async (req, res) => {
  var order = await getDummyOrder()
  var feedback = order.feedback
  res.render('user/feedback', {
    rating: feedback?.rating,
    content: feedback?.content,
    notifyUpdated: req.query.updated,
    notifyDeleted: req.query.deleted
  })
});

router.post('/', async (req, res) => {
  var order = await getDummyOrder()
  await Feedback.create({
    order_id: order.id,
    content: req.body.content,
    rating: req.body.rating,
  });
  res.render('user/feedback_success');
});

router.put('/', async (req, res) => {
  var order = await getDummyOrder()
  var feedback = order.feedback
  if (feedback == null) return
  var content = req.body.content.trim();
  feedback.rating = req.body.rating;
  feedback.content = content.length === 0 ? null : content;
  feedback.save();
  res.set('HX-Redirect', '/feedback?updated=true');
  res.send();
})

router.delete('/', async (req, res) => {
  var order = await getDummyOrder()
  var feedback = order.feedback
  await feedback?.destroy()
  res.set('HX-Redirect', '/feedback?deleted=true');
  res.send();
})

export default router