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
      // adding setTimeout to avoid this warning
      // Warning: setState(...): Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.
      /*
      .then(({error, payload}) => {
        if (error) {
          throw payload
        } 
        
        dispatch(push('/'))
      })
      */
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

export const USER_REGISTER = 'USER_REGISTER'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE'

export function register(firstName, lastName, email) {
  return {
    [CALL_API]: {
      types: [
        USER_REGISTER,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAILURE
      ],
      endpoint: `/api/users/create`,
      method: 'POST'
    },
    payload: {firstName, lastName, email}
  }
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

export const USER_SEARCH_BY_EMAIL = 'USER_SEARCH_BY_EMAIL'
export const USER_SEARCH_BY_EMAIL_SUCCESS = 'USER_SEARCH_BY_EMAIL_SUCCESS'
export const USER_SEARCH_BY_EMAIL_FAILURE = 'USER_SEARCH_BY_EMAIL_FAILURE'

export function searchUsersByEmail(searchString) {
  return {
    [CALL_API]: {
      types: [
        USER_SEARCH_BY_EMAIL,
        USER_SEARCH_BY_EMAIL_SUCCESS,
        USER_SEARCH_BY_EMAIL_FAILURE
      ],
      endpoint: `/api/users/search-by-email?search=${searchString}`
    }
  }
}

export const USER_SEARCH_BY_NAME = 'USER_SEARCH_BY_NAME'
export const USER_SEARCH_BY_NAME_SUCCESS = 'USER_SEARCH_BY_NAME_SUCCESS'
export const USER_SEARCH_BY_NAME_FAILURE = 'USER_SEARCH_BY_NAME_FAILURE'

export function searchUsersByName(searchString) {
  return {
    [CALL_API]: {
      types: [
        USER_SEARCH_BY_NAME,
        USER_SEARCH_BY_NAME_SUCCESS,
        USER_SEARCH_BY_NAME_FAILURE
      ],
      endpoint: `/api/users/search-by-name?search=${searchString}`
    }
  }
}
