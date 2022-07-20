import { UserTypes } from "config/constants"
import { NextFunction, Request, Response } from "express"

const ensureAuthenticated = (user: UserTypes) => (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user == user) return next()
  res.redirect('/dashboard')
}

export const ensureAuthAdmin = ensureAuthenticated(UserTypes.Admin)
export const ensureAuthKitchen = ensureAuthenticated(UserTypes.Kitchen)
export const ensureAuthClerk = ensureAuthenticated(UserTypes.Clerk)