# chatbot
serverless, AWS-service-driven Chatbot web application 

## Overview
I will be building an AWS Chatbot using S3, API Gateway, Lambda, Lex, DynamoDB, Elastic Search, and some open source API. 

## Workflow 
### step 1
Building chatbot frontend and host it in an AWS S3 bucket. Then set up chat API using AWS API Gateway and connect it with a Lambda function ('chat') to receive and response to chat messages from the user. 
- [x] enable CORS on all API methods including the preflight OPTIONS methods. 
- [x] import the Javascript SDK to the frontend directory to invoke AWS APIs. 

### step 2
Building chatbot using AWS Lex. Implement at least the following three intents: 
1. GreetingIntent
2. ThankYouIntent
3. BookSuggestionsIntent
Then, set up a lambda function to pass user message to Lex and to receive the processed response from Lex.  

Through conversation, collect the following pieces of information from the user: 
* Genre
* Publication date
* Language 
* Award Winner
Then push the information collected from the user (genre, language, etc.) to an SQS queue (Q1). 

Confirm to the user that you received their request and that you will notify them over SMS once you have the list of books suggestions. 

Now, integrate Lex into the chat API: extract user message from the request, pass it to Lex, send back response from Lex as response. 

### step 3 
Use the NYT-Book API to collect 3,000+ distinct books from all time period. Create a table in DynamoDB to store the collected data. 
