import { IncomingWebhook } from '@slack/webhook';
import dotenv from 'dotenv'
dotenv.config()
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

const loggerStream = {
    write: message => {
      webHook.send({
        text: message
      })
      console.log('Capturando el Log', message);
    },
  };

export { loggerStream };