/* App for spotting the International Space Station (ISS), which makes API requests to three different services:
1.Fetch our IP Address through www.ipify.org
2.Fetch the geo coordinates (Latitude & Longitude) for our IP through freegeoip.app
3.Fetch the next ISS flyovers for our geo coordinates.
Returns 5 upcoming times that the ISS will fly over, and the duration it will remain "visible" in the sky */

//Main fetch function

//1.Fetch our IP Address
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// //2.Fetch the geo coordinates (Latitude & Longitude) for our IP
// fetchCoordsByIP((error, geo) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned geolocation:' , geo);
// });

// 3.Fetch the next ISS flyovers for our geo coordinates
// fetchISSFlyOverTimes((error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! The next ISS flys: ' , coords);
// });
