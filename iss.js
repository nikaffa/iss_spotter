//Fetches the data from each API endpoint
const request = require('request');

// Requests to fetch IP address
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
    callback(null, body); //IP as JSON string
  });
};

// Requests to fetch coordinates
const fetchCoordsByIP = callback => {
  //const url = fetchMyIP(null, ip);
  request('https://api.freegeoip.app/json/8.8.8.8?apikey=ff54d2c0-3f37-11ec-a81f-67c1336b9b80', (error, response, body) => {
    if (error) { //passes the error to the callback if an error occurs: invalid domain, user is offline, etc.
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) { // if non-200 status, assume server error
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null); //creates a new Error object to pass as an error
      return;
    }
    callback(null, { latitude: JSON.parse(body).latitude, longitude: JSON.parse(body).longitude }); //geo coordinates (long&lat) as object
  });
};

/* Request to fetch ISS fly over times
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = (callback) => {
  // let lat = fetchCoordsByIP().latitude;
  // let long = fetchCoordsByIP().longitude;
  // `https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${long}
  request(`https://iss-pass.herokuapp.com/json/?lat=37.751&lon=-97.822`, (error, response, body) => {
    if (error) { //passes the error to the callback if an error occurs: invalid domain, user is offline, etc.
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) { // if non-200 status, assume server error
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null); //creates a new Error object to pass as an error
      return;
    }
    callback(null, JSON.parse(body).response); //arr of obj
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };