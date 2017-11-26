// src
export * from './appUtils'
export * from './errorUtils'
export * from './sequelize'
export { default as buildEntityManagerFunctions } from './buildEntityManagerFunctions'
export { default as bindEntityApiRoutes } from './bindEntityApiRoutes'
export * from './authUtils'

export const build404ErrorHandler = options => {
  
  // this func is partially inspired by:
  // http://stackoverflow.com/a/9802006/162461
  return (req, res) => {
    res.status(404)
    
    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({ errorMessage: 'Page not found' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found')
  }
}

export const handle500Error = (err, req, res) => {
  const m = `An internal server error occurred: ${err}`
  console.error("\x1b[31m", `An internal server error occurred: `, err.stack, "\x1b[0m")
  
  res.status(500)
  
  // respond with html page
  if (req.accepts('html')) {
    res.render('500', { errorMessage: m })
    return
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ errorMessage: m})
    return
  }

  // default to plain-text. send()
  res.type('txt').send(m)
}

export const build500ErrorHandler = options => (err, req, res, next) => handle500Error(err, req, res)
