// libs
import passport from 'passport'

// src
import { findByID as findUserByID } from '../managers/userManager'

export const setupPassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    findUserByID(id)
      .then(user => {
        done(null, user.get({ plain: true }))
      })
  })
}

// use where you want to make sure that
// a user is not and should not be already logged-in
export const ensureAnonymity = (req, res, next) => {
  const {user} = req

  if (user) {
    res
      .status(401)
      .send({message: `This url cannot be called since a user is already logged in: ${user.email}`})
    return
  }

  next()
}

const handleAuthError = (req, res) => {
  const { url, user, path } = req

  if (url.indexOf('/api') > -1) {
    res
      .status(401)
      .send({
        message: 'Access denied'
      })
  } else {
    if (!user) {
      res.redirect(`/login?redirectUrl=${path}`)
    } else {
      res.render('error', {message: 'Access Denied, you are not authorized to view this page.'})
    }
  }
}

export const authorizePath = (req, res, next) => {
  const { user } = req

  if (!user) {
    handleAuthError(req, res)
  }

  next()
}

export const ensureAuthorization = authorizePath
