let list = [];

const get = () => {
  return list;
}

const set = (newList) => {
  list = newList;
}

export default {
  get: get,
  set: set
}
