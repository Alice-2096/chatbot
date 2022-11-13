async function getBotResponse(userText) {
  var requestOptions = {
    method: 'POST',
    body: JSON.stringify(userText),
  };

  var res;
  //use API Gateway to invoke lambda function
  await fetch(
    'https://yhfpxk773f.execute-api.us-east-1.amazonaws.com/dev//chatbot',
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      res = data.body;
    });
  return res;
}
