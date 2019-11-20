const express = require("express");
const router = express.Router();
const userModel = require("./../models/User.js");
const collegeModel = require("./../models/College");
const tripModel = require("./../models/Trip");
const scheduleModel = require("./../models/Schedule");

// console.log(user);
module.exports = router;

router.get("/planner", (req, res, next) => {
  tripModel
    .find()
    .populate("college")
    .populate("trainers")
    .then(dbRes => {
      console.log(dbRes);
      res.render("plannerHome", {
        user: req.session.currentUser,
        trips: dbRes,
        css: ["adminHome", "main"]
      });
    })
    .catch(err => console.log(err));
});

router.post("/create-trip", (req, res, next) => {
  console.log(req.query);
});

router.get("/create-trip", (req, res, next) => {
  res.render("../views/forms/trip-create.hbs", {
    user: req.session.currentUser,
    css: ["userProfile"]
  });
});

router.get("/planthetrip/:id", (req, res) => {
  tripModel
    .findOne({ _id: req.params.id })
    .populate("trainers")
    .then(dbRes => {
      scheduleModel
        .find({ tripID: req.params.id })
        .then(dbRes1 => {
          res.render("planSchedule", {
            user: req.session.currentUser,
            trip: dbRes,
            data: dbRes1,
            noOfBatches: dbRes.numberOfBatches,
            css: ["adminHome", "main", "reset"],
            scripts: ["ajaxSchedule"]
          });
        })
        .catch();
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/update-status", (req, res) => {
  tripModel
    .findByIdAndUpdate(req.query.id, { scheduleStatus: req.query.status })
    .then()
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
        "sessionName.name": req.query.sessionName,
        "sessionName.timings": req.query.sessionTimings
      };

      let update = {
        trainer: dbRes._id
      };

      scheduleModel
        .findOneAndUpdate(filter, update, {
          new: true,
          upsert: true // Make this update into an upsert
        })
        .then()
        .catch(dbErr => console.log(dbErr));
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/update-topic", (req, res) => {
  let filter = {
    tripID: req.query.id,
    date: req.query.date,
    "batchName.batch": req.query.batch,
    "sessionName.name": req.query.sessionName,
    "sessionName.timings": req.query.sessionTimings
  };

  let update = {
    topic: req.query.topic
  };
  scheduleModel
    .findOneAndUpdate(filter, update, {
      new: true,
      upsert: true // Make this update into an upsert
    })
    .then()
    .catch(dbErr => console.log(dbErr));
});
