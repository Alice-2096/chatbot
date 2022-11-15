var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

exports.handler = async (event) => {
  // Create an SQS service object
  var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
  var queueURL = 'https://sqs.us-east-1.amazonaws.com/442362234575/myQ';

  var params = {
    AttributeNames: ['HotelBookingRequest'],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: ['All'],
    QueueUrl: queueURL,
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0,
  };

  var result = '';

  //pull message from SQS queue one at a time
  try {
    result = await sqs.receiveMessage(params).promise();
    result = result['Messages'][0]['Body'];
  } catch (err) {
    console.log(err);
  }

  //TODO: invoke API to get a hotel recommendation from DynamoDB and Elastic Search
  var hotelRecommendation = 'Here is what we found for you: xxx';
  //TODO:format recommendations and send them over text message using SNS

  //TODO: delete message from the SQS queue
  return;
};
