async function getBotResponse(userText) {
  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application.json' },
    body: JSON.stringify(userText),
  };

  //use API Gateway to invoke lambda function
  const res = await fetch(
    'https://u4aq6om2ki.execute-api.us-east-1.amazonaws.com/dev',
    requestOptions
  ).then((response) => JSON.parse(response));

  return res;
}
