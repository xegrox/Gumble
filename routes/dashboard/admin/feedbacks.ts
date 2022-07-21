import express from 'express'
import { Feedback } from 'models/feedback'
import paginate from 'express-paginate'

const router = express.Router();

router.get('/', paginate.middleware(), async (req, res) => {
  var result = await Feedback.findAndCountAll({limit: <any>req.query.limit, offset: req.skip});
  var pageCount = Math.ceil(result.count / <any>req.query.limit)
  
  res.render('dashboard/admin/feedback', {
    title: 'Feedbacks',
    feedbacks: result.rows,
    pageCount: pageCount,
    pages: paginate.getArrayPages(req)(3, pageCount, <any>req.query.page),
    currentPage: req.query.page,
    prevUrl: paginate.href(req)(true, {}),
    nextUrl: paginate.href(req)(false, {})
    // subtitle: avg_rating ? `Average rating: ${avg_rating}/5` : null,
  });
})

export default router;