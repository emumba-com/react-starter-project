import twilioConfig from './../../config/twilio.config';
import twilio from 'twilio';
const accountSid = twilioConfig.getAccountSid();
const authToken = twilioConfig.getAuthToken();
const fromNumber = twilioConfig.getFromNumber();
const from = twilioConfig.getFromNumber();
const client = new twilio.RestClient(accountSid, authToken);
import q from 'q';

const sendEventReminderSMS = (to, eventTitle, eventUrl, eventStartTime) => {
  const message = "GivingAt.work: " + eventTitle + " is happening at " + eventStartTime + ", for details visit: " + eventUrl;
  console.log(message);
  sendSms(to, message);
};

const sendBroadcastMessage = (to, from, content) => {
  const message = `${from} via GivingAtWork: ${content}`;
  console.log(message);
  sendSms(to, message);
}

const sendSms = (to, message) => {
    
  const promise = q.defer();
  
  client.messages.create({body: message, to: to, from: fromNumber}, (err, message) => {
    if(err){
      console.log('error while sending sms: ' + JSON.stringify(err));
      return promise.reject(err);
    }
        
    promise.resolve();
  });
    
  return promise.promise;    
}


export default{
  sendEventReminderSMS: sendEventReminderSMS,
  sendBroadcastMessage: sendBroadcastMessage
}
