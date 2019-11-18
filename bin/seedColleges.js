const collegesSample = [
  {
    collegeID: "102312",
    collegeName: "Paris University1",
    collegeAddress: "223, Boulevard Voltaire",
    city: "Paris",
    collegeSPOC: { name: "John Doe1", phone: "+33 453 609 2394" }
  },
  {
    collegeID: "102313",
    collegeName: "Paris University2",
    collegeAddress: "224, Boulevard Voltaire",
    city: "Paris",
    collegeSPOC: { name: "John Doe2", phone: "+33 453 609 2394" }
  },
  {
    collegeID: "102314",
    collegeName: "Paris University3",
    collegeAddress: "225, Boulevard Voltaire",
    city: "Paris",
    collegeSPOC: { name: "John Doe3", phone: "+33 453 609 2394" }
  },
  {
    collegeID: "102315",
    collegeName: "Paris University4",
    collegeAddress: "226, Boulevard Voltaire",
    city: "Paris",
    collegeSPOC: { name: "John Doe4", phone: "+33 453 609 2394" }
  }
];

const mongoose = require("mongoose");
const collegeModel = require("../models/College.js");

mongoose.connect("mongodb://localhost/Travelog", {
  useNewUrlParser: true,
  useCreateIndex: true
});

collegeModel
  .insertMany(collegesSample)
  .then(dbVal => {
    console.log("inserted");
    mongoose.connection.close();
  })
  .catch(err => console.log(error));
