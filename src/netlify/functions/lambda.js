const axios = require('axios');

exports.handler = async function (event, context) {

  const API_KEY =  process.env.REACT_API_KEY;

  return {
    statusCode: 200,
    body: JSON.stringify(API_KEY)
  }

}
