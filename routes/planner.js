const express = require("express");
const router = express.Router();
const userModel = require("./../models/User.js");
const collegeModel = require("./../models/College");
const tripModel = require("./../models/Trip");
const scheduleModel = require("./../models/Schedule");
module.exports = router;

router.get("/planner", (req, res, next) => {
  tripModel
    .find()
    .then(dbRes => {
      res.render("plannerHome", {
        trips: dbRes,
        css: ["adminHome", "main"]
      });
    })
    .catch(err => console.log(err));
});

router.get("/planthetrip/:id", (req, res) => {
  tripModel
    .findOne({ _id: req.params.id })
    .populate("trainers")
    .then(dbRes => {
      res.render("planSchedule", {
        trip: dbRes,
        noOfBatches: dbRes.numberOfBatches,
        css: ["adminHome", "main", "reset"],
        scripts: ["ajaxSchedule"]
      });
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/update-status", (req, res) => {
  console.log(req.query);

  tripModel
    .findByIdAndUpdate(req.query.id, { scheduleStatus: req.query.status })
    .then(dbRes => console.log(dbRes))
    .catch(dbErr => console.log(dbErr));
});
