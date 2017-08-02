// libs
import express from 'express'

// src
import { renderResponse } from './spa'

const router = express.Router()

router.get('*', (req, res) => renderResponse(req, res))

export default router
