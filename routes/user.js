const express = require("express");
const router = express.Router();
const userProtect = require("../middleware/protection");
const userModel = require("../models/User");
const tripModel = require("../models/Trip");
const bcrypt = require("bcrypt");
const dataHelper = require("../helpers/dataFormat");
const scheduleModel = require("../models/Schedule");
const moment = require("moment");

router.get("/home", async (req, res, next) => {
  console.log("here");
  const user = req.session.currentUser;
  try {
    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate());
    previousDay.setHours(1, 0, 0, 0);
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(1, 0, 0, 0);
    const dbRes = await userModel.findOne({ email: user.email });
    const trainerFutureTrips = await tripModel
      .find({ trainers: dbRes._id, "tripDates.0": { $gt: nextDay } })
      .populate("college");
    const tripIds = [...trainerFutureTrips.map(trip => trip._id)];
    const tripSchedules = await scheduleModel.find({ tripID: tripIds });
    const currentTrips = await tripModel
      .find({
        trainers: dbRes._id,
        $and: [
          { "tripDates.0": { $gt: previousDay } },
          { "tripDates.0": { $lt: nextDay } },
          { "tripDates.1": { $gt: new Date() } }
        ]
      })
      .populate("college");
    const previousTrips = await tripModel
      .find({
        trainers: dbRes._id,
        "tripDates.0": { $lt: previousDay }
      })
      .populate("college");
    console.log(previousDay);
    console.log("-----------------------");
    console.log(nextDay);

    res.render("userHome", {
      user: dbRes,
      futureTrips: trainerFutureTrips,
      schedule: tripSchedules,
      currentTrip: currentTrips,
      previousTrip: previousTrips,
      css: ["userHome"]
    });
  } catch (err) {
    console.log(err);
  }
  // userModel.findOne({ email: "andybrown098@live.co.uk" }).then(dbRes => {
  // tripModel
  //   .find({ trainers: dbRes._id, "tripDates.0": { $gt: new Date() } }) //Need to add further search parameters to find all the dates
  //   .populate("college")
  //   .then(tripDbRes => [...tripDbRes.map(trip => trip._id)])
  //   .then(tripId => scheduleModel.find({ tripID: tripId }))
  //   .then(filteredSchedules => {
  //     const previous = new Date();
  //     previous.setDate(previous.getDate() - 1);
  //     const nextDay = new Date();
  //     nextDay.setDate(nextDay.getDate() + 1);
  //     return tripModel.find({
  //       trainers: dbRes._id,
  //       $and: [
  //         { tripDates: { $lt: nextDay } },
  //         { tripDates: { $gt: previous } }
  //       ]
  //     });
  //   })
  //   .then(tripDatesFiltered => console.log(tripDatesFiltered))
  //   .catch(err => console.log(err));
  // });
});

router.get("/edit-profile/:id", userProtect, (req, res, next) => {
  userModel
    .findOne({ _id: req.params.id })
    .then(dbRes => {
      res.render("edit-profile", {
        user: dbRes
      });
    })
    .catch(dbErr => console.log(dbErr));
});

router.post("/edit-profile", userProtect, (req, res, next) => {
  const id = req.session.currentUser;
  const body = {
    profilePicture: req.body.profilePicture,
    email: req.body.email,
    contactNumber: req.body.contactNumber,
    password: req.body.password
  };

  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(req.body.password, salt);

  body.password = hashed;

  userModel
    .findByIdAndUpdate(id, body)
    .then(dbRes => {
      res.redirect("/home");
    })
    .catch(err => console.log(err));
});

module.exports = router;
