var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));
app.use(express.static("views"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", function (req, res) {
  let inputDate;

  if (req.params.date) {
    const { date } = req.params;

    if (/^\d+$/.test(date)) {
      inputDate = new Date(parseInt(date));
    } else {
      inputDate = new Date(date);
    }

    if (isNaN(inputDate.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
  } else {
    inputDate = new Date();
  }

  res.json({
    unix: inputDate.getTime(),
    utc: inputDate.toUTCString(),
  });
});


var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
