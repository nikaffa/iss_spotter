//Fetches the data from each API endpoint
const request = require('request');

// Requests to fetch IP address from JSON API
const fetchMyIP = callback => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) { //passes the error to the callback if an error occurs: invalid domain, user is offline, etc.
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) { // if non-200 status, assume server error
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null); //creates a new Error object to pass as an error
      return;
    }

    callback(null, body); //passes the IP in JSON
  });
};

module.exports = { fetchMyIP };