// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp Microservice endpoint
app.get("/api/:date", function (req, res) {
  // Get the date parameter from the URL
  const { date } = req.params;

  // Create a Date object based on the provided parameter
  let inputDate;
  if (/^\d+$/.test(date)) {
    // If it's a Unix timestamp
    inputDate = new Date(parseInt(date));
  } else {
    // If it's a date string
    inputDate = new Date(date);
  }

  // Check if the input is a valid date
  if (isNaN(inputDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Respond with the Unix timestamp and UTC time
  res.json({
    unix: inputDate.getTime(),
    utc: inputDate.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
