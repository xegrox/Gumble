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

  // Rating filter
  if (req.query.rating) {
    let split = (req.query.rating as string).split(',')
    let start = parseInt(split[0])
    let end = parseInt(split[1])
    if (isNaN(start)) start = 1
    if (isNaN(end)) end = 5
    where['rating'] ??= {}
    where['rating'][Op.between] = [start, end]
    viewParams['startRate'] = start
    viewParams['endRate'] = end
  }

  // Date filter
  if (req.query.startDate) {
    let start = safeDate(req.query.startDate as string)
    let end = safeDate(req.query.endDate as string)
    end.setHours(23, 59, 59, 59)
    where['updatedAt'] ??= {}
    where['updatedAt'][Op.between] = [start.raw, end.raw]
    viewParams['startDate'] = start.format('%m/%d/%Y')
    viewParams['endDate'] = end.format('%m/%d/%Y')
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