'use strict';
import * as AWS from '@aws-sdk/client-lex-runtime-v2';

export const handler = async (event, context) => {
  //TODO: parse request body, i.e., get chatbot massage from the user
  var reply = '';
  const body = JSON.stringify(event.body);

  //instantiate a lex client
  const client = new AWS.LexRuntimeV2({ region: 'us-east-1' });

  const params = {
    botAliasId: 'TSTALIASID' /* required */,
    botId: 'D9X6KS5LMF',
    localeId: 'en_US' /* required */,
    sessionId: 'test-session',
    text: 'hello', //hardcode it for now
  };

  //Sends user input to Lex. In response, Lex returns the next message to convey to the user.
  try {
    reply = await client.recognizeText(params);
  } catch (error) {
    console.log(error);
  }

  //return Lex's reply to the frontend to be displayed to the user
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: reply,
  };
  return response;
};
