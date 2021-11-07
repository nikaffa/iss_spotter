//Fetches the data from each API endpoint USING PROMISES
const request = require('request-promise-native');
const apikey = require('./apikey');

// Requests user's ip address from API www.ipify.org
const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json'); //returns ip as JSON string
};

// Requests to fetch coordinates (long&lat)for a given ip
const fetchCoordsByIP = body => {
  const ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=${apikey.apikey}`); //returns coordinates as JSON object
};

//Request to fetch ISS fly overs by given coordinates
const fetchISSFlyOverTimes = body => {
  const latitude = JSON.parse(body).latitude;
  const longitude = JSON.parse(body).longitude;
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP() //returns ip
    .then(fetchCoordsByIP) //returns coordinates for given ip
    .then(fetchISSFlyOverTimes) //returns JSON string with next flyes
    .then(data => {
      return JSON.parse(data).response; //arr of objects that should be formatted and logged
    });
};

module.exports = { nextISSTimesForMyLocation };