/* @flow */

// libs
import express from 'express'

// src
import config from '../../../config/app.config'

const router = express.Router()

router.get('/api/config', (req, res) => {
  res.send(config)
})

export default router
