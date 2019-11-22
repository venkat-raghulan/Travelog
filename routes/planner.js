const express = require("express");
const router = express.Router();
const userModel = require("./../models/User.js");
const collegeModel = require("./../models/College");
const tripModel = require("./../models/Trip");
const scheduleModel = require("./../models/Schedule");
const moment = require("moment");

// console.log(user);
module.exports = router;

router.get("/planner", (req, res, next) => {
  tripModel
    .find()
    .populate("college")
    .populate("trainers")
    .then(dbRes => {
      // console.log(dbRes);
      res.render("plannerHome", {
        user: req.session.currentUser,
        trips: dbRes,
        css: ["adminHome", "main"],
        scripts: ["plannerHome"]
      });
    })
    .catch(err => console.log(err));
});

router.post("/create-trip", (req, res, next) => {
  let tripDates = req.body.tripDates.split(",");
  tripDates = tripDates.map(a => moment(a.trim(), "DD/MM/YYYY"));
  let sessionInfo = [];
  let sessionNames = req.body.sessionName.split(",");
  sessionNames = sessionNames.map(a => a.trim());
  let length = sessionNames.length;
  let sessionTimings = req.body.sessionTimings.split(",");
  sessionTimings = sessionTimings.map(a => a.trim());
  for (i = 0; i < length; i++) {
    let object = {};
    object.name = sessionNames[i];
    object.timings = sessionTimings[i];
    sessionInfo.push(object);
  }

  let newTrip = {
    oifID: req.body.oifID,
    college: req.body.college,
    tripDates: tripDates,
    numberOfBatches: req.body.numberOfBatches,
    sessionInfo: sessionInfo
  };
  tripModel
    .create(newTrip)
    .then(dbRes => res.redirect("/create-trip"))
    .catch(dbErr => console.log(dbErr));
});

router.post("/edit-trip/:id", (req, res, next) => {
  let tripDates = req.body.tripDates.split(",");
  tripDates = tripDates.map(a => moment(a.trim(), "DD/MM/YYYY"));
  let sessionInfo = [];
  let sessionNames = req.body.sessionName.split(",");
  sessionNames = sessionNames.map(a => a.trim());
  let length = sessionNames.length;
  let sessionTimings = req.body.sessionTimings.split(",");
  sessionTimings = sessionTimings.map(a => a.trim());
  for (i = 0; i < length; i++) {
    let object = {};
    object.name = sessionNames[i];
    object.timings = sessionTimings[i];
    sessionInfo.push(object);
  }

  let editedTrip = {
    oifID: req.body.oifID,
    college: req.body.college,
    tripDates: tripDates,
    numberOfBatches: req.body.numberOfBatches,
    sessionInfo: sessionInfo
  };
  tripModel
    .findByIdAndUpdate(req.params.id, editedTrip, { new: true, upsert: true })
    .then(dbRes => res.redirect("/planner"))
    .catch(dbErr => console.log(dbErr));
});

router.get("/create-trip", (req, res, next) => {
  collegeModel
    .find()
    .then(dbRes => {
      // console.log(dbRes);
      res.render("../views/forms/trip-create.hbs", {
        colleges: dbRes,
        user: req.session.currentUser,
        css: ["userProfile"]
      });
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/edit-trip/:id", (req, res, next) => {
  collegeModel
    .find()
    .then(dbRes => {
      console.log(dbRes);
      tripModel
        .findById(req.params.id)
        .then(dbRes1 => {
          res.render("../views/forms/trip-edit.hbs", {
            trip: dbRes1,
            colleges: dbRes,
            user: req.session.currentUser,
            css: ["userProfile"]
          });
        })
        .catch(dbErr => console.log(dbErr));
    })
    .catch(dbErr => console.log(dbErr));
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

router.get("/delete-trip/:id", (req, res, next) => {
  tripModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => console.log(dbRes))
    .catch(dbErr => console.log(dbErr));
});

router.get("/populate-trainer-box", (req, res, next) => {
  userModel
    .find({ userType: "Trainer" })
    .then(dbRes => res.send(dbRes))
    .catch(dbErr => console.log(dbErr));
});

router.get("/assign-trainer/:id", (req, res, next) => {
  console.log(req.params.id);
  tripModel
    .findOneAndUpdate(
      { _id: req.query.id, trainers: { $nin: [req.params.id] } },
      { $push: { trainers: req.params.id } }
    )
    .populate("trainer")
    .then(
      userModel
        .findById(req.params.id)
        .then(dbRes => res.send(dbRes))
        .catch(dbErr => console.log(dbErr))
    )
    .catch(dbErr => console.log(dbErr));
});
