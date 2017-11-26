/* @flow */

// libs
import express from 'express'

// src
import { bindEntityApiRoutes, ensureAnonymity, caughtError } from '../../utils'
import {
  findByID,
  findAll,
  create,
  updateByID,
  deleteByID,
  findUserByEmailAndPassword
} from '../../managers/userManager'

const router = express.Router()

bindEntityApiRoutes(router, '/api/users', { findByID, findAll, create, updateByID, deleteByID })

// requires email and password
router.post('/api/login', ensureAnonymity, (req, res) => {
  const { body } = req

  if ( !body ) {
    res
      .status(400)
      .send({
        message: 'Missing request body'
      })
  }

  const { email, password } = body

  if ( !email || !password ) {
    res
      .status(400)
      .send({
        message: 'Missing requied arguments'
      })
  }

  findUserByEmailAndPassword(email, password)
    .then(item => {
      const user = item.get({ plain: true })

      return req.login(user, err => {
        if ( err ) {
          caughtError(res, err)
        } else {
          res.send({ user })
        }
      })
    })
    .catch(error => caughtError(res, error))
})

router.get('/api/logout', (req, res) => {
  req.logout()
  res.send({
    message: 'User logged out successfully!'
  })
})

export default router
