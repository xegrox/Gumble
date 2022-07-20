import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
  res.render('dashboard/admin/appearance', {
    title: 'Menu appearance'
  });
})

export default router