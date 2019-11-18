const express = require("express");
const router = express.Router();
const userModel = require("./../models/User.js");
const collegeModel = require("./../models/College");
const tripModel = require("./../models/Trip");
module.exports = router;

router.get("/planner", (req, res, next) => {
  tripModel
    .find()
    .then(dbRes => {
      res.render("plannerHome", {
        trips: dbRes,
        css: ["adminHome", "main", "reset"]
      });
    })
    .catch();
});

router.get("/planthetrip/:id", (req, res) => {
  tripModel
    .findOne({ _id: req.params.id })
    .then(dbRes => {
      console.log(dbRes);
      res.render("planSchedule", {
        trip: dbRes,
        noOfBatches: dbRes.numberOfBatches,
        css: ["adminHome", "main", "reset"]
      });
    })
    .catch(dbErr => console.log(dbErr));
});
