'use strict';

exports.handler = async function (event, context) {
  //TODO: parse request body, i.e., get chatbot massage from the user
  const body = JSON.stringify(event.body);

  //TODO: process payload using AWS Lex
  const reply = "I'm still under development. Please come back later.";

  //TODO: log response message in DynamoDB.

  //return status code and chatbot response message as a string
  const response = {
    statusCode: 200,
    body: reply,
  };
  return response;
};
