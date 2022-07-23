import express from 'express'
import { Feedback } from 'models/feedback'
import paginate from 'express-paginate'
import { Op } from 'sequelize'
import { Date } from 'sugar'

const router = express.Router();

function safeDate(date_str: string) {
  let date = new Date(date_str)
  return date.isValid().raw ? date : new Date()
}

router.get('/', paginate.middleware(), async (req, res) => {
  let viewParams = {}
  let where = {}

  // Date filter
  if (req.query.start) {
    let start = safeDate(req.query.start as string)
    let end = safeDate(req.query.end as string)
    end.setHours(23, 59, 59, 59)
    where['createdAt'] ??= {}
    where['createdAt'][Op.between] = [start, end]
    viewParams['startDate'] = start.format('%Y-%m-%d')
    viewParams['endDate'] = end.format('%Y-%m-%d')
  }

  var result = await Feedback.findAndCountAll({
    limit: <any>req.query.limit,
    offset: req.skip,
    where: where
  });

  var pageCount = Math.ceil(result.count / <any>req.query.limit)
  res.render('dashboard/admin/feedback', {
    title: 'Feedbacks',
    feedbacks: result.rows,
    pageCount: pageCount,
    pages: paginate.getArrayPages(req)(3, pageCount, <any>req.query.page),
    currentPage: req.query.page,
    prevUrl: paginate.href(req)(true, {}),
    nextUrl: paginate.href(req)(false, {}),
    ...viewParams
  });
})

export default router;