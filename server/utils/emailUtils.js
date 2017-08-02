import aws from 'aws-sdk';
import {_} from 'underscore';
import fs from 'fs';
import q from 'q';
import path from 'path'
import awsConfig from '../../config/aws.config.js';
import appUtils from './appUtils';

aws.config.update(awsConfig)
const ses = new aws.SES({apiVersion: '2010-12-01'});
//const fromEmail = 'GivingAt.work <no-reply@givingat.work>',
const FROM_EMAIL = 'GivingAt.work <social@givingat.work>';

const sendInviteRequestEmail = (to, data) => {
  return sendEmail('invite-request.html', to, 'Invite Request - GivingAt.work', data);
};

const sendNewEventLeadAddedEmail = (to, data) => {
  return sendEmail('event-lead-created.html', to, 'You are now an Event Lead - GivingAt.work', data);
};

const sendPasswordResetEmail = (to, data) => {
  return sendEmail('reset-password.html', to, 'Reset Password - GivingAt.work', data);
};

const sendInviteRequestConfirmationEmail = (to) => {    
  return sendEmail('invite-request-confirmation.html', to, 'Invite Request Received - GivingAt.work', {});  
};

const sendAccountCreationEmail = (to, data) => {    
  return sendEmail("confirm-your-account.html", to, 'Verify your email account', data);
};

const sendDuringEventEmail = (to, data) => {
  return sendEmail("during-event-email.html", to, 'Keep everyone posted', data);
}

const sendPostEventEmails = (to, data) => {  
  return sendEmail("post-event-email.html", to, 'Thank you for your particpation', data);
}

const sendUserGoingNotificationToLead = (to, data) => {    
  return sendEmail("notify-lead-user-going.html", to, data.subject, data);
};

const sendEventReminderEmail = (to, data) => {
  return sendEmail("event-reminder.html", to, data.subject, data);
};

const sendInviteToEventEmail = (to, data) => {
  return sendEmail("invite-to-event.html", to, data.subject, data);
};

const sendEventLeadCommentEmail = (to, data) =>{  
  return sendEmail("notify-user-event-lead-comment.html", to, `New comment on ${data.eventTitle}`, data);
};

const sendEventBroadcastMessageEmail = (to, data) =>{  
  return sendEmail("event-broadcast-message.html", to, `New message on ${data.eventTitle}`, data);
};

const sendEmail = (templateName, to, subject, data) => {

  console.log('sending email to: ' + to);
  let promise = q.defer();
  
  //read template file from disk
  
  fs.readFile(path.resolve(`./server/templates/email/${templateName}`), 'utf-8', (err, content) => {
    
    if(err){
      console.log('Error while reading temaplte: ' + err);
      return promise.reject(err);
    }
    //feed the content to _.template
    let template = _.template(content);
    let result = template(data);

    let receivers = typeof (to) === 'string' ? [to] : to;
    
    if(appUtils.isTest())
      return promise.resolve()
      
    ses.sendEmail({
       Source: FROM_EMAIL,
       Destination: { ToAddresses: receivers },
       Message: {
           Subject: {
              Data: subject
           },
           Body: {
               Html: {
                   Data: result
               }
            }
       }
    }, 
    (err, data) => {
        if(err)
          return promise.reject(err);
            
        return promise.resolve();        
    });    
  });
  
  return promise.promise;
};

const extractDomain = (email) => {
  let index = email.indexOf('@')
  return email.substring(index + 1)
};

export default{
  sendNewEventLeadAddedEmail,
  sendEventBroadcastMessageEmail,
  sendEventLeadCommentEmail,
  sendPasswordResetEmail,
  sendInviteRequestEmail,
  sendInviteRequestConfirmationEmail,
  sendDuringEventEmail,
  sendPostEventEmails,
  sendEventReminderEmail,
  sendAccountCreationEmail,
  sendInviteToEventEmail,
  extractDomain,
  sendUserGoingNotificationToLead
}
