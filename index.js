/* App for spotting the International Space Station (ISS), which makes API requests to three different services:
1.Fetch our IP Address
2.Fetch the geo coordinates (Latitude & Longitude) for our IP
3.Fetch the next ISS flyovers for our geo coordinates */

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
const { fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

