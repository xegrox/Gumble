import express from 'express'
import { Feedback } from 'models/feedback'

const router = express.Router();

router.get('/', async (req, res) => {
  var feedbacks = await Feedback.findAll();
  var avg_rating = feedbacks.reduce((acc, obj) => acc + obj.rating, 0) / feedbacks.length;
  res.render('dashboard/admin/feedback', {
    layout: 'dashboard',
    title: 'Feedbacks',
    subtitle: avg_rating ? `Average rating: ${avg_rating}/5` : null,
    feedbacks: feedbacks
  });
})

export default router;