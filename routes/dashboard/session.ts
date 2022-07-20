import passport from "passport";
import { Router } from "express";

const router = Router()

router.post('/', passport.authenticate('local'), (req, res) => {
  res.set('HX-Refresh', 'true');
  res.send();
})

router.delete('/', (req, res) => {
  req.logout(() => {})
  res.set('HX-Redirect', './');
  res.send();
})

export default router