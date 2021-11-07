/* App for spotting the International Space Station (ISS), which makes API requests to three different services:
1.Fetch our IP Address through www.ipify.org
2.Fetch the geo coordinates (Latitude & Longitude) for our IP through freegeoip.app
3.Fetch the next ISS flyovers for our geo coordinates.
Returns 5 upcoming times that the ISS will fly over, and the duration it will remain "visible" in the sky */

const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = passTimes => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(passTimes => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
  

