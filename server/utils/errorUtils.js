const reportError = (res, status, message) => {
  res.status(status)
  res.send({message})
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'NotFoundError'
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'BadRequestError'
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'InternalServerError'
  }
}

export class AccessDeniedError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = 'AccessDeniedError'
  }
}

export const caughtError = (res, error) => {
  const m = `An internal server error occurred: ${error}`
  console.error('\x1b[31m', m)
  console.error(error.stack, '\x1b[0m')

  if ( error && (
       error instanceof BadRequestError
    || error.name === 'BadRequestError'
    || error instanceof InternalServerError
    || error.name === 'InternalServerError'
    || error instanceof NotFoundError
    || error.name === 'NotFoundError'
    || error instanceof AccessDeniedError
    || error.name === 'AccessDeniedError')) {    
    if ( error instanceof BadRequestError || error.name === 'BadRequestError') {
      res.status(400)
    } else if ( error instanceof NotFoundError || error.name === 'NotFoundError') {
      res.status(404)
    } else if ( error instanceof InternalServerError || error.name === 'InternalServerError') {
      res.status(500)
    } else if ( error instanceof AccessDeniedError || error.name === 'AccessDeniedError' ) {
      res.status(401)
    }
  } else {
    res.status(500)
  }

  res.send({message: m})
}

export default {
  reportError,
  NotFoundError,
  AccessDeniedError,
  BadRequestError,
  InternalServerError,
  caughtError
}
