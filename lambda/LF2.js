//Lambda function interfaced with Lex and SQS

//helper function to check which slot is unfilled.
function validate(slots) {
  if (slots['location']) {
    return {
      isValid: False,
      violatedSlot: 'location',
    };
  }
  if (slots['date']) {
    return {
      isValid: False,
      violatedSlot: 'date',
    };
  }
  if (slots['nights']) {
    return {
      isValid: False,
      violatedSlot: 'nights',
    };
  }
  if (slots['beds']) {
    return {
      isValid: False,
      violatedSlot: 'beds',
    };
  }
  if (slots['pet']) {
    return {
      isValid: False,
      violatedSlot: 'pet',
    };
  }
  if (slots['phone']) {
    return {
      isValid: False,
      violatedSlot: 'phone',
    };
  }
  return { isValid: True };
}

exports.handler = async (event) => {
  console.log(event);
  const slots = event['sessionState']['intent']['slots'];
  const intent = event['sessionState']['intent']['name'];
  const validation_result = validate(slots);
  console.log(event['invocationSource']);
  console.log(slots);
  console.log(intent);

  //The dialogAction field directs Amazon Lex to the next course of action, and
  // describes what to expect from the user after Amazon Lex returns a response to the client.

  //elicit and validate user's data input
  if (event['invocationSource'] == 'DialogCodeHook') {
    if (!validation_result['isValid']) {
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
    //user has finished entering all the required info
    else {
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
  }

  if (event['invocationSource'] == 'FulfillmentCodeHook') {
    //TODO: push user's input data to SQS

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
    };
    return response;
  }
};
