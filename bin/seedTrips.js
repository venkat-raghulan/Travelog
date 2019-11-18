var mydate1 = new Date("2016-05-18T16:00:00Z");
var mydate2 = new Date("2016-05-19T16:00:00Z");

const tripSample = [
  {
    tripID: 10001,
    oifID: 2103,
    college: "5dd278b9407a7a439bde60cf",
    tripDates: {
      startDate: mydate1,
      endDate: mydate2
    },
    numberOfBatches: 7,
    sessionInfo: [
      { name: "s1", timings: "9-11.30am" },
      { name: "s2", timings: "1-4pm" }
    ],
    trainers: ["5dd187b6b2e36331189101ca"]
  },
  {
    tripID: 10002,
    oifID: 2104,
    college: "5dd278b9407a7a439bde60cf",
    tripDates: {
      startDate: mydate1,
      endDate: mydate2
    },
    numberOfBatches: 6,
    sessionInfo: [
      { name: "s1", timings: "9-11.30am" },
      { name: "s2", timings: "1-4pm" }
    ],
    trainers: ["5dd187b6b2e36331189101ca"]
  },
  {
    tripID: 10003,
    oifID: 2105,
    college: "5dd278b9407a7a439bde60cf",
    tripDates: {
      startDate: mydate1,
      endDate: mydate2
    },
    numberOfBatches: 3,
    sessionInfo: [
      { name: "s1", timings: "9-11.30am" },
      { name: "s2", timings: "1-4pm" }
    ],
    trainers: ["5dd187b6b2e36331189101ca"]
  }
];

const mongoose = require("mongoose");
const tripModel = require("../models/Trip.js");

mongoose.connect("mongodb://localhost/Travelog", {
  useNewUrlParser: true,
  useCreateIndex: true
});

tripModel
  .insertMany(tripSample)
  .then(dbVal => {
    console.log("inserted");
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
