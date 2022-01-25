const axios = require('axios');

exports.handler = async function (event, context) {

  const API_KEY =  process.env.REACT_API_KEY;

  let uri = "https://rest.coinapi.io/v1/assets";

  const response = await fetch(uri, {
    method: 'GET',
    headers: {'X-CoinAPI-Key': API_KEY}
  });
  const resJson = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(resJson)
  }

}
