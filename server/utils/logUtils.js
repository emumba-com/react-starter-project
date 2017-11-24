//import winston from 'winston';
import some from 'lodash/some'
import * as appUtils from './appUtils';

const excludedFilesFromWinstonLogging = ['.js', '.css', '.jpg', '.png', '.ico', '.json'];
const excludePostBodyFromWinstonLogging = [
  '/api/users/change-password', 
  '/api/users/reset-password',
  '/api/users/verify-account',
  '/api/login'
];


const setupWinstonProductionLogs = () => {
  require('./../../config/winston.production.config.js');  
}

const setupUrlLogs = (req, res, next) => {  
  const url = req.originalUrl;
  
  if(req.user){
    if (!some(excludedFilesFromWinstonLogging, file => appUtils.stringEndsWith(url, file))){
      
      console.log(appUtils.makeLogContextString(req) + '[' + req.method + ']: ' + req.hostname + req.url);
                  
      if(req.method == 'POST' && !some(excludePostBodyFromWinstonLogging, url => req.url == url))
        console.log('POST BODY: ' + JSON.stringify(req.body));          
    }  
  }
  next()
}

export default{
  setupUrlLogs: setupUrlLogs,
  setupWinstonProductionLogs: setupWinstonProductionLogs
}
