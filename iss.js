//Fetches the data from each API endpoint
const request = require('request');
const apikey = require('./apikey');

// Requests to fetch IP address
const fetchMyIP = callback => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) { //passes the error to the callback if an error occurs: invalid domain, user is offline, etc.
      return callback(error, null);
    }
    if (response.statusCode !== 200) { // if non-200 status, assume server error
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null); //creates a new Error object to pass as an error
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip); //IP as JSON string
  });
};

// Requests to fetch coordinates for a given ip
const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.freegeoip.app/json/${ip}?apikey=${apikey.apikey}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    callback(null, { latitude: JSON.parse(body).latitude, longitude: JSON.parse(body).longitude }); //geo coordinates (long&lat) as object
  });
};

//Request to fetch ISS fly overs
const fetchISSFlyOverTimes = (coords, callback)=> {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const passes = JSON.parse(body).response; //arr of obj
    callback(null, passes);
  });
};

/** Main function
 * Takes a callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 */
const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };