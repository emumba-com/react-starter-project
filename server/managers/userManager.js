/* @flow */

const USER_OBJECTS = [{
    id: 1,
    email: 'starter@emumba.com',
    password: '123456',
    firstName: 'Starter',
    lastName: 'Project',
    linkHome: '/'
  }]  

export const getUser = () => USER_OBJECTS[0]

export const findUserByEmailAndPassword = (email:string, password:string):Object =>
  USER_OBJECTS.find(user => user.email === email && user.password === password)

export const findUserByID = (id:number):Object =>
  USER_OBJECTS.find(user => user.id === id)
