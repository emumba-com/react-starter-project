import appUtils from './appUtils';
import parseDomain from 'parse-domain';

//sets req.subdomain field based on current req.url
const setSubdomainIfNotAlreadySet = (req) => {
    
  if(appUtils.isProduction()){              
    const domain = parseDomain(req.hostname);                    
        
    if(domain != null && domain.subdomain != null && domain.subdomain.trim().length > 0){            
      
      if(domain.subdomain == 'www')        
        return;
      
      if(domain.subdomain.indexOf('www.') > -1)
        domain.subdomain = domain.subdomain.substring(4, domain.subdomain.length);              
        
      req.subdomain = domain.subdomain;      
      return;
    }            
  }
  else{
    const hostname = req.hostname;    
    if(req.hostname.indexOf('.app.localhost') != 0){
      //domain already exists in url
      const index = hostname.lastIndexOf('.app.localhost');    
      req.subdomain = hostname.substring(0, index).length == 0 ? null : hostname.substring(0, index);
    }
    else
      req.subdomain = null;
  }    
};

const domainSetupMiddleware = (req, res, next) => {
  if(req.user){    
    
    //set the subdomain in the req      
    setSubdomainIfNotAlreadySet(req);    
    
    if(req.subdomain == null){
      //if subdomain couldn't be set, it means its an invalid url/request
      //redirect to a correct url
      const newUrl = appUtils.getUrl(req.url, req.user.organization.subdomain);      
      return res.redirect(newUrl);
    }
    
    if(req.user.organization.subdomain != req.subdomain){
      console.log('wrong subdomain: ' + req.subdomain + ', throwing error');
      return res.render('error', {message: 'Wrong subdomain, Access denied'});    
    }
  }
  
  next();  
}

export default{
  setSubdomainIfNotAlreadySet,
  domainSetupMiddleware
}
