/* @flow */

// libs
import express from 'express'

// src
import { bindEntityApiRoutes } from '../../utils'
import { findByID, findAll, create, updateByID, deleteByID } from '../../managers/iconManager'

const router = express.Router()

bindEntityApiRoutes(router, '/api/icons', { findByID, findAll, create, updateByID, deleteByID })

export default router
