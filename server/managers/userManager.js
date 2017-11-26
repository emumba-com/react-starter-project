/* @flow */

// src
import { buildEntityManagerFunctions } from '../utils'
import { User } from '../models'

export const { findByID, deleteByID, findAll, create, updateByID } = buildEntityManagerFunctions(User)

export const findUserByEmailAndPassword = (email:string, password:string):Object => {
  return User.findOne({where: {email, password}})
}

const USER_OBJECT = {
  email: "starter",
  password: "123456",
  firstName: "React",
  lastName: "Starter"
}

export const createUserIfNotExist = () =>
  User.findAndCountAll({ limit: 1 })
    .then(({ count }) => count < 1 && create(USER_OBJECT))
