async function getBotResponse(userText) {
  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application.json' },
    body: JSON.stringify(userText),
  };

  //use API Gateway to invoke lambda function
  const res = await fetch(
    'https://yhfpxk773f.execute-api.us-east-1.amazonaws.com/dev',
    requestOptions
  ).then((response) => JSON.parse(response));
  console.log(res);
  return res;
}
