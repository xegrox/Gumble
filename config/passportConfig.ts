import passport from 'passport'
import bcrypt from 'bcryptjs'
import { Configuration } from 'models/configuration'
import { Strategy } from 'passport-local'
import { UserTypes } from './constants'

export function configurePassport() {
  passport.use(new Strategy({
    usernameField: 'user',
    passwordField: 'password'
  }, async (user, password, done) => {
    if (user !in UserTypes) return done(null, null, { message: 'Invalid user' })
    let config = (await Configuration.findOne({attributes: [`${user}_pass`]}))!
    let pwd = config[`${user}_pass` as keyof typeof config] as string
    if (pwd == undefined) return done(null, null)
    let isMatch = bcrypt.compareSync(password, pwd)
    if (!isMatch) return done(null, null, { message: 'Incorrect password' })
    return done(null, user)
  }))

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))
}