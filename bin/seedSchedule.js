const mongoose = require("mongoose");
const schModel = require("../models/Schedule.js");

const firstUser = [
  {
    tripID: "5dd302e1f6caf03e343e29e8",
    date: Date.now(),
    batchName: "S1",
    sessionName: "Web Developer",
    trainer: "5dd2e630637df3131c88683d",
    topic: "Teach WebDev To Students",
    scheduleStatus: true
  }
];

mongoose.connect("mongodb://localhost/Travelog", {
  useNewUrlParser: true,
  useCreateIndex: true
});

schModel
  .insertMany(firstUser)
  .then(dbVal => {
    console.log("inserted");
    mongoose.connection.close();
  })
  .catch(err => console.log(error));
