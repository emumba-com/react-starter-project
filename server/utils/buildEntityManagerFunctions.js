// src
import { NotFoundError } from './errorUtils'

/**
 * A factory function that generates basic entity management
 * functions for a give entity
 */
export default (entity, options?:{ queryOptions?:Object } = {}) => {
    const { queryOptions = {} } = options
    const findByID = (id: number): Promise<any> =>
        entity.findOne(Object.assign({
            where: {
                id
            }
        }, queryOptions))
        .then(item => {
            if (!item) {
                throw new NotFoundError(`Couldn't find an object with id ${id}`)
            }

            return item
        })

    const deleteByID = (id: number): Promise<any> =>
        findByID(id)
            .then(item => item.destroy())

    const findAll = (): Promise<any> => entity.findAll(queryOptions)

    const create = (attributes: Object): Promise<any> => entity.create(attributes)

    const updateByID = (id: number, attributes: Object): Promise<any> =>
        findByID(id)
            .then(item => item.update(attributes))

    return { findByID, findAll, create, updateByID, deleteByID }
}
