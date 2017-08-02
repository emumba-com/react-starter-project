//list holds organizationId as key and list of {email, firstName, lastName} as object
let list = {};

const get = () => {
  return list;
}

const findEmailsBySearchTermAndOrganizationId = (search, organizationId) => {
  if(!list[organizationId])
    return [];
    
  const users = list[organizationId].filter(item => item.email.indexOf(search.toLowerCase()) > -1);
  return users.map(item => item.email)
}

const findUsersBySearchTermAndOrganizationId = (search, organizationId) => {
  if(!list[organizationId])
    return [];
    
  return list[organizationId].filter(item => item.firstName.toLowerCase().indexOf(search.toLowerCase()) > -1 || 
  item.lastName.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

const set = (newList) => {
  list = newList;
}

export default {
  //get: get,
  set: set,
  findUsersBySearchTermAndOrganizationId: findUsersBySearchTermAndOrganizationId,
  findEmailsBySearchTermAndOrganizationId: findEmailsBySearchTermAndOrganizationId
}
