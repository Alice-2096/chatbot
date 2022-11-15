'use strict';
var AWS = require('aws-sdk');
const {
  LexRuntimeServiceClient,
} = require('@aws-sdk/client-lex-runtime-service-node/LexRuntimeServiceClient');
const {
  PostContentCommand,
} = require('@aws-sdk/client-lex-runtime-service-node/commands/PostContentCommand');

exports.handler = async function (event, context) {
  //TODO: parse request body, i.e., get chatbot massage from the user
  var reply = '';
  const body = JSON.stringify(event.body);

  //instantiate a lex client
  const lexRuntimeService = new LexRuntimeServiceClient({
    region: 'us-east-1',
  });
  const lexUserId = 'hotel-chatbot' + Date.now();
  const params = {
    botAlias: 'TestBotAlias',
    botName: 'HotelChatbot',
    contentType: 'text/plain',
    inputStream: body,
    userId: lexUserId,
  };

  //Sends user input to Lex. In response, Lex returns the next message to convey to the user.
  const postContentCommand = new PostContentCommand(params);
  lexRuntimeService
    .send(postContentCommand)
    .then((data) => {
      reply = data;
    })
    .catch((error) => {
      console.log(error);
    });

  //return Lex's reply to the frontend to be displayed to the user
  const response = {
    statusCode: 200,
    body: reply,
  };
  return response;
};
