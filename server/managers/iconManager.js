/* @flow */

// src
import { Icon } from '../models'
import { buildEntityManagerFunctions } from '../utils'

export const { findByID, deleteByID, findAll, create, updateByID } = buildEntityManagerFunctions(Icon)
