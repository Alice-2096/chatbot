//Lambda function interfaced with Lex and SQS
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

//helper function to check which slot is unfilled.
function validate(slots) {
  if (!slots['location']) {
    return {
      isValid: 'False',
      violatedSlot: 'location',
    };
  }
  if (!slots['date']) {
    return {
      isValid: 'False',
      violatedSlot: 'date',
    };
  }
  if (!slots['nights']) {
    return {
      isValid: 'False',
      violatedSlot: 'nights',
    };
  }
  if (!slots['beds']) {
    return {
      isValid: 'False',
      violatedSlot: 'beds',
    };
  }
  if (!slots['pet']) {
    return {
      isValid: 'False',
      violatedSlot: 'pet',
    };
  }
  if (!slots['phone']) {
    return {
      isValid: 'False',
      violatedSlot: 'phone',
    };
  }
  return { isValid: 'True' };
}

exports.handler = async (event) => {
  const slots = event['sessionState']['intent']['slots'];
  const intent = event['sessionState']['intent']['name'];
  const validation_result = validate(slots);
  const invocationSource = event['invocationSource'];
  console.log(invocationSource);

  //The dialogAction field directs Amazon Lex to the next course of action, and
  // describes what to expect from the user after Amazon Lex returns a response to the client.

  //elicit and validate user's data input
  if (invocationSource == 'DialogCodeHook') {
    if (!validation_result['isValid']) {
      console.log('we are now in DialogCodeHook mode');
      const response = {
        sessionState: {
          dialogAction: {
            slotToElicit: validation_result['violatedSlot'],
            type: 'ElicitSlot', //The next action is to elicit a slot value from the user.
          },
          intent: {
            name: intent,
            slots: slots,
          },
        },
      };
      return response;
    }

    const response = {
      sessionState: {
        dialogAction: {
          type: 'Delegate', //The next action is determined by Amazon Lex.
        },
        intent: {
          name: intent,
          slots: slots,
        },
      },
    };
    return response;
  }

  if (invocationSource == 'FulfillmentCodeHook') {
    console.log('hello, now we are in the fullfillmentCodeHook');
    //push message to SQS
    AWS.config.update({ region: 'us-east-1' });
    const client = new AWS.SQS({ apiVersion: '2012-11-05' });

    const params = {
      MessageBody: JSON.stringify({
        location: slots['location']['value']['resolvedValues'][0],
        date: slots['date']['value']['resolvedValues'][0],
        nights: slots['nights']['value']['resolvedValues'][0],
        beds: slots['beds']['value']['resolvedValues'][0],
        pet: slots['pet']['value']['resolvedValues'][0],
        phone: slots['phone']['value']['resolvedValues'][0],
      }),
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/442362234575/myQ',
    };

    await client
      .sendMessage(params)
      .promise()
      .catch((err) => console.log(err));

    //The next action is to close the dialog
    const response = {
      sessionState: {
        dialogAction: {
          type: 'Close',
        },
        intent: {
          name: intent,
          slots: slots,
          state: 'Fulfilled',
        },
      },
      messages: [
        {
          contentType: 'PlainText',
          content: 'Thank you! You will receive hotel suggestion shortly',
        },
      ],
    };
    return response;
  }
};
