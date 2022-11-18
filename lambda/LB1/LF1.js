'use strict';
import * as AWS from '@aws-sdk/client-lex-runtime-v2';

export const handler = async (event, context) => {
  //get chatbot massage from the user
  var reply = '';
  const userInput = JSON.stringify(event.body);

  //instantiate a lex client
  const client = new AWS.LexRuntimeV2({ region: 'us-east-1' });

  const params = {
    botAliasId: 'TSTALIASID' /* required */,
    botId: 'D9X6KS5LMF',
    localeId: 'en_US' /* required */,
    sessionId: 'test-session',
    text: userInput, //hardcode it for now
  };

  //Sends user input to Lex.
  try {
    reply = await client.recognizeText(params);
  } catch (error) {
    console.log(error);
  }

  const bot_response = reply['messages'][0]['content'] ?? '';

  //return Lex's reply to the frontend to be displayed to the user
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: bot_response,
  };
  return response;
};

/** 
the JSON response message from Lex is formatted as follows: 
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "52a18205-113c-4ccf-a455-0adc82530fd4",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "interpretations": [
    {
      "intent": {
        "confirmationState": "None",
        "name": "bookHotel",
        "slots": {},
        "state": "InProgress"
      },
      "nluConfidence": {
        "score": 1
      }
    },
    {
      "intent": {
        "name": "FallbackIntent",
        "slots": {}
      }
    },
    {
      "intent": {
        "name": "ThankYouIntent",
        "slots": {}
      },
      "nluConfidence": {
        "score": 0.45
      }
    },
    {
      "intent": {
        "name": "GreetingIntent",
        "slots": {}
      },
      "nluConfidence": {
        "score": 0.22
      }
    }
  ],
  "messages": [
    {
      "content": "Where are you planning to stay, uptown, midtown, or downtown?",
      "contentType": "PlainText"
    }
  ],
  "sessionId": "test-session",
  "sessionState": {
    "dialogAction": {
      "slotToElicit": "location",
      "type": "ElicitSlot"
    },
    "intent": {
      "confirmationState": "None",
      "name": "bookHotel",
      "slots": {},
      "state": "InProgress"
    },
    "originatingRequestId": "3c22f2b1-8366-4070-8e8f-f0f38f4ae2d7",
    "sessionAttributes": {}
  }
}
 */
