// libs
import { push } from 'react-router-redux'

// src
import { CALL_API } from '../../middleware/api'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'

function callApiLogin(email, password) {
  return {
    [CALL_API]: {
      types: [
        USER_LOGIN,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAILURE
      ],
      endpoint: `/api/login`,
      method: 'POST'
    },
    payload: {email, password}
  }
}

export function login(email, password) {
  return (dispatch, getState) =>
    dispatch(callApiLogin(email, password))
}

export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE'

function callApiLogout() {
  return {
    [CALL_API]: {
      types: [
        USER_LOGOUT,
        USER_LOGOUT_SUCCESS,
        USER_LOGOUT_FAILURE
      ],
      endpoint: `/api/logout`,
      method: 'GET'
    }
  }
}

export function logout() {
  return (dispatch, getState) =>
    dispatch(callApiLogout())
      .then(() => dispatch(push('/login')))
}

export const USER_FORGOT_PASSWORD = 'USER_FORGOT_PASSWORD'
export const USER_FORGOT_PASSWORD_SUCCESS = 'USER_FORGOT_PASSWORD_SUCCESS'
export const USER_FORGOT_PASSWORD_FAILURE = 'USER_FORGOT_PASSWORD_FAILURE'

export function forgotPassword(email) {
  return {
    [CALL_API]: {
      types: [
        USER_FORGOT_PASSWORD,
        USER_FORGOT_PASSWORD_SUCCESS,
        USER_FORGOT_PASSWORD_FAILURE
      ],
      endpoint: `/api/users/forgot-password`,
      method: 'POST'
    },
    payload: {email}
  }
}

export const USER_CONFIRM_REGISTRATION = 'USER_CONFIRM_REGISTRATION'
export const USER_CONFIRM_REGISTRATION_SUCCESS = 'USER_CONFIRM_REGISTRATION_SUCCESS'
export const USER_CONFIRM_REGISTRATION_FAILURE = 'USER_CONFIRM_REGISTRATION_FAILURE'

export function confirmRegistration(id, password, confirmPassword) {
  return {
    [CALL_API]: {
      types: [
        USER_CONFIRM_REGISTRATION,
        USER_CONFIRM_REGISTRATION_SUCCESS,
        USER_CONFIRM_REGISTRATION_FAILURE
      ],
      endpoint: `/api/users/verify-account?id=${id}`,
      method: 'POST'
    },
    payload: {password, confirmPassword}
  }
}

export const USER_RESET_PASSWORD = 'USER_RESET_PASSWORD'
export const USER_RESET_PASSWORD_SUCCESS = 'USER_RESET_PASSWORD_SUCCESS'
export const USER_RESET_PASSWORD_FAILURE = 'USER_RESET_PASSWORD_FAILURE'

export function resetPassword(id, password, confirmPassword) {
  return {
    [CALL_API]: {
      types: [
        USER_CONFIRM_REGISTRATION,
        USER_CONFIRM_REGISTRATION_SUCCESS,
        USER_CONFIRM_REGISTRATION_FAILURE
      ],
      endpoint: `/api/users/reset-password?id=${id}`,
      method: 'POST'
    },
    payload: {id, password, confirmPassword}
  }
}

export const USER_CHANGE_PASSWORD = 'USER_CHANGE_PASSWORD'
export const USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS'
export const USER_CHANGE_PASSWORD_FAILURE = 'USER_CHANGE_PASSWORD_FAILURE'

export function changePassword(currentPassword, newPassword, confirmNewPassword) {
  return {
    [CALL_API]: {
      types: [
        USER_CONFIRM_REGISTRATION,
        USER_CONFIRM_REGISTRATION_SUCCESS,
        USER_CONFIRM_REGISTRATION_FAILURE
      ],
      endpoint: `/api/users/change-password`,
      method: 'POST'
    },
    payload: {currentPassword, newPassword, confirmNewPassword}
  }
}

export const USERS_FETCH_BY_ID =         'USERS_FETCH_BY_ID'
export const USERS_FETCH_BY_ID_SUCCESS = 'USERS_FETCH_BY_ID_SUCCESS'
export const USERS_FETCH_BY_ID_FAILURE = 'USERS_FETCH_BY_ID_FAILURE'

export function fetchUserByID(id:number):Object {
  return {
    [CALL_API]: {
      types: [
        USERS_FETCH_BY_ID,
        USERS_FETCH_BY_ID_SUCCESS,
        USERS_FETCH_BY_ID_FAILURE
      ],
      endpoint: `/api/users/${id}`,
      method: 'GET'
    },
    meta: { id }
  }
}

export const USERS_CREATE =         'USERS_CREATE'
export const USERS_CREATE_SUCCESS = 'USERS_CREATE_SUCCESS'
export const USERS_CREATE_FAILURE = 'USERS_CREATE_FAILURE'

export function createUser(data) {
  return {
    [CALL_API]: {
      types: [
        USERS_CREATE,
        USERS_CREATE_SUCCESS,
        USERS_CREATE_FAILURE
      ],
      endpoint: `/api/users`,
      method: 'POST'
    },
    payload: data
  }
}

export const USERS_DELETE =         'USERS_DELETE'
export const USERS_DELETE_SUCCESS = 'USERS_DELETE_SUCCESS'
export const USERS_DELETE_FAILURE = 'USERS_DELETE_FAILURE'

export function deleteUser(id) {
  return {
    [CALL_API]: {
      types: [
        USERS_DELETE,
        USERS_DELETE_SUCCESS,
        USERS_DELETE_FAILURE
      ],
      endpoint: `/api/users/${id}`,
      method: 'DELETE'
    },
    meta: { id }
  }
}

export const USERS_UPDATE =         'USERS_UPDATE'
export const USERS_UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS'
export const USERS_UPDATE_FAILURE = 'USERS_UPDATE_FAILURE'

export function updateUserByID(id:number, attributes:Object):Object {
  return {
    [CALL_API]: {
      types: [
        USERS_UPDATE,
        USERS_UPDATE_SUCCESS,
        USERS_UPDATE_FAILURE
      ],
      endpoint: `/api/users/${id}`,
      method: 'PUT'
    },
    payload: attributes,
    meta: { id, attributes }
  }
}
