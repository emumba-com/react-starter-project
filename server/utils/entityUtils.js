import _ from 'underscore';
import isArray from 'lodash/isArray';

/**
 * param can be:
 * 1. an entity
 * 2. an array of entities
 */
export const makeObjectCache = param => {
  const r = {};
  const arr = isArray(param) ? param : [param];
  arr.forEach(item => r[item.id] = item);

  return r;
};
