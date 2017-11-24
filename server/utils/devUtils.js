const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./../../webpack.config.js');
import path from 'path'

const setupWebpack = (app) => {
  console.log(`[devUtils] Setting up HMR for frontend`)

  const compiler = webpack(config)

  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
}

const setupHMR = () => {
  console.log(`[devUtils] Setting up HMR for backend`)
  
  const compiler = webpack(config);

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  const serverPath = path.resolve('./server')
  // TODO setup backend hmr

  // Do "hot-reloading" of react stuff on the server
  // Throw away the cached client modules and let them be re-required next time
  compiler.plugin('done', () => {
    console.log("Clearing /client/ module cache from server");
    Object.keys(require.cache).forEach((id) => {
      if (/[\/\\]client[\/\\]/.test(id))
        delete require.cache[id];
    });
  });
}

export default {
  setupWebpack: setupWebpack,
  setupHMR: setupHMR
}
