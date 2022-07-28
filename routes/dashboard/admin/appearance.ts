import express from "express";
import { Configuration } from "models/configuration";

const router = express.Router();

router.get('/', async (req, res) => {
  let config = await Configuration.findOne()
  res.render('dashboard/admin/appearance', {
    title: 'Menu appearance',
    bg_color: config.bg_color,
    pri_color: config.pri_color,
    sec_color: config.sec_color
  });
})

router.post('/', async (req, res) => {
  let config = await Configuration.findOne()
  await config.update({
    bg_color: req.body.bg_color,
    pri_color: req.body.pri_color,
    sec_color: req.body.sec_color
  })
  res.redirect('/dashboard/admin/appearance')
})

export default router