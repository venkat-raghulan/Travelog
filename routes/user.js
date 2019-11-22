const express = require("express");
const router = express.Router();
const userProtect = require("../middleware/protection");
const userModel = require("../models/User");
const tripModel = require("../models/Trip");
const bcrypt = require("bcrypt");
const dataHelper = require("../helpers/dataFormat");
const scheduleModel = require("../models/Schedule");
const moment = require("moment");
const uploadCloud = require("./../config/cloudinary");

router.get("/home", async (req, res, next) => {
  const user = req.session.currentUser;
  if (user === undefined) {
    res.redirect("/");
    return;
  }
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

    res.render("userHome", {
      user: dbRes,
      futureTrips: trainerFutureTrips,
      schedule: tripSchedules,
      currentTrip: currentTrips,
      previousTrip: previousTrips,
      css: ["userHome"],
      scripts: ["userHome"]
    });
  } catch (err) {
    console.log(err);
  }
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

router.post(
  "/edit-profile",
  userProtect,
  uploadCloud.single("image"),
  (req, res, next) => {
    const id = req.session.currentUser;
    const body = {
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
  }
);

router.get("/home/:id", (req, res, next) => {
  const tripId = req.params.id;
  tripModel
    .findById(tripId)
    .populate("college")
    .populate("trainers")
    .then(dbRes => {
      scheduleModel
        .find({ tripID: dbRes._id, trainer: req.session.currentUser._id }) //req.session.currentUser._id
        .then(schRes => {
          const tripData = {
            trip: dbRes,
            schedule: schRes
          };
          res.send(tripData);
        })
        .catch(schErr => console.log(schErr));
    })
    .catch(err => console.log(err));
});

router.get("/profile-picture/:id", (req, res, next) => {
  res.render("profilePic", {
    user: req.session.currentUser,
    scripts: ["webcam"],
    css: ["profilepic"]
  });
});

router.post(
  "/profile-picture/:id",
  uploadCloud.single("webcam"),
  (req, res, next) => {
    // const id = req.params.id;
    const pic = { profilePicture: req.file.url };
    userModel
      .findByIdAndUpdate(req.session.currentUser._id, pic)
      .then(() => {
        res.send("Success");
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
