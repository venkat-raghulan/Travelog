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

router.get("/update-trainer", (req, res) => {
  let trainer = req.query.trainer;
  var employeeID = trainer.substr(0, trainer.indexOf(":"));
  userModel
    .findOne({ employeeID: employeeID })
    .then(dbRes => {
      let filter = {
        tripID: req.query.id,
        date: req.query.date,
        "batchName.batch": req.query.batch,
        "sessionName.name": req.query.sessionName
      };

      let update = {
        trainer: dbRes._id
      };

      scheduleModel
        .findOneAndUpdate(filter, update, {
          new: true,
          upsert: true // Make this update into an upsert
        })
        .then(dbRes => console.log(dbRes))
        .catch(dbErr => console.log(dbErr));
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/update-topic", (req, res) => {
  let filter = {
    tripID: req.query.id,
    date: req.query.date,
    "batchName.batch": req.query.batch,
    "sessionName.name": req.query.sessionName
  };

  let update = {
    topic: req.query.topic
  };
  scheduleModel
    .findOneAndUpdate(filter, update, {
      new: true,
      upsert: true // Make this update into an upsert
    })
    .then(dbRes => console.log(dbRes))
    .catch(dbErr => console.log(dbErr));
});
