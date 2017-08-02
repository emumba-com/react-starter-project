import moment from 'moment';
const PRE_EVENT_REMINDER_EMAIL_POOLING_INTERVAL = 900000; //15 minutes, check after every x minutes
const PRE_EVENT_EMAIL_REMINDER_DURATION = 86400000; //millis in a day
const DURING_EVENT_EMAIL_POOLING_INTERVAL = 900000; //15 minutes, check after every x minutes
const DURING_EVENT_DURATION = 1800000; //30 minutes
const POST_EVENT_EMAIL_POOLING_INTERVAL = 900000; //15 minutes, check after every x minutes
const POST_EVENT_DURATION = 3600000; //millis in an hour
const PRE_EVENT_REMINDER_SMS_POOLING_INTERVAL = 900000; //15 minutes, check after every x minutes
const PRE_EVENT_SMS_REMINDER_DURATION = 21600000; //6 hours
const UPDATE_USER_AUTO_COMPLETE_LIST_INTERVAL = 1800000; //half hour
const UPDATE_SUBDOMAIN_LIST_INTERVAL = 86400000; //daily


import eventManager from './../managers/eventManager';
import eventInteractionManager from './../managers/eventInteractionManager';
import emailUtils from './emailUtils';
import smsUtils from './smsUtils';
import timeUtils from './timeUtils';
import Event from './../models/event';
import User from './../models/user';
import Organization from './../models/organization';
import appUtils from './appUtils';
import organizationManager from './../managers/organizationManager';
import userAutoCompleteUtils from './userAutoCompleteUtils';
import encryptionUtils from './encryptionUtils';
import subdomainListUtils from './subdomainListUtils';
import bitlyUtils from './bitlyUtils';
import notificationManager from './../managers/notificationManager'

const sendEventReminderEmails = () => {
  //console.log('Executing scheduleEventReminderEmails...');
  //find all the events that have 24 hours remaining in the start time 
  //and lie within the window of PRE_EVENT_EMAIL_INTERVAL  
  const start = moment.utc().valueOf() + PRE_EVENT_EMAIL_REMINDER_DURATION;
  const until = start + PRE_EVENT_REMINDER_EMAIL_POOLING_INTERVAL;
  
  //console.log('reminder: ' + start);
  //console.log('reminder: ' + until);
  
  eventManager.findAllBetween(start, until)
  .then((events) => {
    if(null == events || events.length == 0)
      return null;
      
    return eventInteractionManager.findInteractions(events, eventInteractionManager.INTERACTION_TYPE_GOING, 
      [{model: User, as: 'user', include: [{model: Organization, as: 'organization'}]},{model: Event, as: 'event'}]);
  })
  .then((goingInteractions) => {
    if(null == goingInteractions || goingInteractions.length == 0)
      return null;
      
    let promises = [];
    goingInteractions.forEach((interaction, index) => {
      const url = eventManager.getFullEventUrl(interaction.event, interaction.user.organization.subdomain);
      const subject = 'Coming Up: ' + interaction.event.title;
      const hours = PRE_EVENT_EMAIL_REMINDER_DURATION /(1000 * 60 * 60);
      const startTime = timeUtils.getEventStartTime(interaction.event, organizationManager.getTimeZone(interaction.user.organization)) 
      const hashTag = organizationManager.getHashTag(interaction.user.organization);
      const timeZone = organizationManager.getTimeZone(interaction.user.organization);
      const date = timeUtils.getEventStartDate(interaction.event, timeZone);
      
      const data = {        
        firstName: interaction.user.firstName,      
        eventTitle: interaction.event.title,    
        eventUrl: url,
        hours: hours,
        subject: subject,
        time: startTime,
        date: date,
        hashTag: hashTag
      };
  
      promises.push(emailUtils.sendEventReminderEmail(interaction.user.email, data));
    });
    
    return Promise.all(promises);
  })
  .then((results) => {
    //console.log('completed sending event reminder email');    
  })
  .catch((error) => {
    //THIS SHOULD SEND AN EMAIL
    console.log('Error in sending event reminder emails: ' + error);
    if(null != error)
      console.log(error.stack);
  });
};

const sendEventReminderSMS = () => {
  //console.log('Executing sendEventReminderSMS...');
  //find all the events that have 6 hours remaining in the start time 
  //and lie within the window of PRE_EVENT_REMINDER_SMS_POOLING_INTERVAL  
  const start = moment.utc().valueOf() + PRE_EVENT_SMS_REMINDER_DURATION;
  const until = start + PRE_EVENT_REMINDER_SMS_POOLING_INTERVAL;
  let goingInteractions = null;
  //console.log('SMS reminder: ' + start);
  //console.log('SMS reminder: ' + until);
  
  eventManager.findAllBetween(start, until)
  .then((events) => {
        
    if(null == events || events.length == 0)
      return null;
          
    return eventInteractionManager.findInteractions(events, eventInteractionManager.INTERACTION_TYPE_GOING, 
      [{model: User, as: 'user', include: [{model: Organization, as: 'organization'}]},{model: Event, as: 'event'}]);
  })
  .then((gi) => {    
    
    goingInteractions = gi;
    
    if(null == goingInteractions || goingInteractions.length == 0)
      return null;        
          
    let promises = [];
    goingInteractions.forEach((interaction, index) => {      
      const url = eventManager.getFullEventUrl(interaction.event, interaction.user.organization.subdomain);      
      console.log('shortening ' + url);
      promises.push(bitlyUtils.shorten(url));      
    });
          
    return Promise.all(promises);
  })
  .then((shortUrls) => {
        
    if(null == shortUrls)
      return null;
        
    let promises = [];  
    
    goingInteractions.forEach((interaction, index) => {
            
      const shortUrlObject = shortUrls[index];      
      if(interaction.user.mobile != null && shortUrlObject.status_code == 200){                              
          const startTime = timeUtils.getEventStartTime(interaction.event, organizationManager.getTimeZone(interaction.user.organization)) 
          promises.push(smsUtils.sendEventReminderSMS(interaction.user.mobile, interaction.event.title, shortUrlObject.data.url, startTime));      
      }
      else if(shortUrlObject.status_code != 200)
        console.log("bitly error: " + JSON.stringify(shortUrlObject));
         
    });                
    
    return Promise.all(promises);
  })
  .then((results) => {
    //console.log('completed sending event reminder SMS');    
  })
  .catch((error) => {
    //THIS SHOULD SEND AN EMAIL
    console.log('Error in sending event reminder sms: ' + error);
    if(null != error)
      console.log(error.stack);
  });
};

const sendDuringEventEmails = () => {
  //console.log('Executing scheduleDuringEventEmails...');
  //find all the events that have started 30 mins ago  
  const start = moment.utc().valueOf() - DURING_EVENT_DURATION;
  const until = moment.utc().valueOf() - DURING_EVENT_DURATION + DURING_EVENT_EMAIL_POOLING_INTERVAL;
  
  //console.log('during ' + start);
  //console.log('during ' + until);
  eventManager.findAllBetween(start, until)
  .then((events) => {
    if(null == events || events.length == 0)
      return null;
      
    return eventInteractionManager.findInteractions(events, eventInteractionManager.INTERACTION_TYPE_GOING, 
      [{model: User, as: 'user', include: [{model: Organization, as: 'organization'}]},{model: Event, as: 'event'}]);
  })
  .then((goingInteractions) => {
    if(null == goingInteractions || goingInteractions.length == 0)
      return null;
      
    let promises = [];
    goingInteractions.forEach((interaction, index) => {
      const url = eventManager.getFullEventUrl(interaction.event, interaction.user.organization.subdomain);
      const hashTag = organizationManager.getHashTag(interaction.user.organization);
      const data = {eventTitle: interaction.event.title, eventUrl : url, hashTag: hashTag};
      promises.push(emailUtils.sendDuringEventEmail(interaction.user.email, data));
    });
    
    return Promise.all(promises);
  })
  .then((results) => {
    //console.log('completed sending during event email');        
  })
  .catch((error) => {
    //THIS SHOULD SEND AN EMAIL
    console.log('Error in sending during event emails: ' + error);
    if(null != error)
      console.log(error.stack);
  });
};

const sendPostEventEmails = () => {
  //console.log('Executing sendPostEventEmails...');
  //find all the events that completed 1 hour ago
  const start = moment.utc().valueOf() - POST_EVENT_DURATION;
  const until = moment.utc().valueOf() - POST_EVENT_DURATION + POST_EVENT_EMAIL_POOLING_INTERVAL;
  
  //console.log('post event email start: ' + start);
  //console.log('post event email end: ' + until);
    
  eventManager.findAllEndedBetween(start, until)
  .then((events) => {
        
    if(null == events || events.length == 0){
      //console.log('none post event email to send');
      return null;
    }
      
    return eventInteractionManager.findInteractions(events, eventInteractionManager.INTERACTION_TYPE_GOING, 
      [{model: User, as: 'user', include: [{model: Organization, as: 'organization'}]},{model: Event, as: 'event'}]);
  })
  .then((goingInteractions) => {      
    
    if(null == goingInteractions || goingInteractions.length == 0)
      return null;
        
    let promises = [];
    goingInteractions.forEach((interaction, index) => {
      const eventUrl = eventManager.getFullEventUrl(interaction.event, interaction.user.organization.subdomain);
      const ueid = encryptionUtils.encryptUserIdAndEventId(interaction.user.id, interaction.event.id);
      const logHoursUrl = appUtils.getUrl("/post-event-actions/" + ueid, interaction.user.organization.subdomain);
      const data = {eventTitle: interaction.event.title, eventUrl, firstName: interaction.user.firstName, logHoursUrl};
      promises.push(emailUtils.sendPostEventEmails(interaction.user.email, data));      
      //send user notification about log hours      
      notificationManager.notifyUserLogHours(null, interaction.event, interaction.user)
    });
    
    return Promise.all(promises);
  })
  .then((results) => {
    //console.log('completed sending post event email');    
  })
  .catch((error) => {
    //THIS SHOULD SEND AN EMAIL
    console.log('Error in sending post event emails: ' + error);
    if(null != error)
      console.log(error.stack);
  });
};

const updateUserAutoCompleteList = () => {
  User.findAll({attributes: ['email', 'organization_id', 'firstName', 'lastName', 'id'], where: {isActive: true}})
  .then((users) => {
    let list = {};
    users.forEach((user, index) => {
      //console.log(JSON.stringify(user));
      if(null == list[user.organization_id])
        list[user.organization_id] = [];
        
      //console.log({email: user.email, firstName: user.firstName, lastName: user.lastName});                  
      list[user.organization_id].push({id: user.id, email: user.email.toLowerCase(), firstName: user.firstName, lastName: user.lastName});            
    });
    
    userAutoCompleteUtils.set(list);            
    //console.log('user email list updated');    
  })
  .catch((error) => {
    console.log('Error in creating user email list: ' + error);
  })
};

const updateSubdomainList = () => {
  Organization.findAll({attributes: ['subdomain']})
  .then((organizations) => {
    let list = [];
    organizations.forEach((org, index) => {
      if(org.subdomain != null)
        list.push(org.subdomain);
    });
    
    subdomainListUtils.set(list);                
  })
  .catch((error) => {
    console.log('Error in creating subdomain list: ' + error);
  })
};

const initializeScheduledTasks = () =>{
  
  setInterval(() => {
    sendEventReminderEmails();
  }, PRE_EVENT_REMINDER_EMAIL_POOLING_INTERVAL);  
  //after scheduling, call it right away once
  sendEventReminderEmails();
  
  setInterval(() => {
    sendDuringEventEmails();
  }, DURING_EVENT_EMAIL_POOLING_INTERVAL);    
  sendDuringEventEmails();
  
  setInterval(() => {
    sendPostEventEmails();
  }, POST_EVENT_EMAIL_POOLING_INTERVAL);  
  sendPostEventEmails();
  
  setInterval(() => {
    updateUserAutoCompleteList();
  }, UPDATE_USER_AUTO_COMPLETE_LIST_INTERVAL);  
  updateUserAutoCompleteList();
  
  setInterval(() => {
    updateSubdomainList();
  }, UPDATE_SUBDOMAIN_LIST_INTERVAL);    
  updateSubdomainList();
  
  setInterval(() => {
    sendEventReminderSMS();
  }, PRE_EVENT_REMINDER_SMS_POOLING_INTERVAL);    
  sendEventReminderSMS();
  
};

export default {
  initializeScheduledTasks,
  updateUserAutoCompleteList
}
