/* @flow */

// libs
import get from 'lodash/get'
import type { Router } from 'express'

// src
import { caughtError } from './errorUtils'

/**
 * A utility function that binds API routes with a given router
 */
export default (router:Router, path:string,
    // entity functions to bind paths against
    functions:{
        findAll?:() => Promise<any>,
        findByID?:(id:number) => Promise<any>,
        create?:(attributes:Object) => Promise<any>,
        deleteByID?:(id:number) => Promise<any>,
        updateByID?:(id:number, attributes:Object) => Promise<any>
    },

    // options
    options?:{
        toJSON?: (item:Object) => Object,
        parse?: (item:Object) => Object
    } = {}) => {
    const { findAll, findByID, create, deleteByID, updateByID } = functions
    const { toJSON = item => item.get({ raw: true }),
        parse = item => item} = options

    findAll && router.get(path, (req, res) => {
        findAll()
            .then(items => items.map(toJSON))
            .then(items => {
                res.send(items)
            })
            .catch(error => caughtError(res, error))
    })

    findByID && router.get(`${path}/:id`, (req, res) => {
        const id = get(req, 'params.id')

        findByID(id)
            .then(item => toJSON(item))
            .then(item => {
                res.send(item)
            })
            .catch(error => caughtError(res, error))
    })

    create && router.post(path, (req, res) => {
        create(parse(req.body))
            .then(item => toJSON(item))
            .then(entity => {
                res.send(entity)
            })
            .catch(error => caughtError(res, error))
    })

    deleteByID && router.delete(`${path}/:id`, (req, res) => {
        const id = get(req, 'params.id')

        deleteByID(id)
            .then(item => {
                res.send(item)
            })
            .catch(error => caughtError(res, error))
    })

    updateByID && router.put(`${path}/:id`, (req, res) => {
        const { params: { id }, body: attributes } = req

        updateByID(id, parse(attributes))
            .then(item => toJSON(item))
            .then(item => {
                res.send(item)
            })
            .catch(error => caughtError(res, error))
    })
}
