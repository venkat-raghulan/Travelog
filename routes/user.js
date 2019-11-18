const express = require("express");
const router = express.Router();
const userProtect = require("../middleware/protection");
const userModel = require("../models/User");
const tripModel = require("../models/Trip");
const bcrypt = require("bcrypt");
const dataHelper = require("../helpers/dataFormat");

router.get("/home", (req, res, next) => {
  // const user = req.session.currentUser;
  userModel
    .findOne({ email: "andybrown098@live.co.uk" })
    .then(dbRes => {
      tripModel
        .find({ trainers: dbRes._id })
        .populate("college")
        .then(tripDbRes => {
          dataHelper(tripDbRes);
          res.render("userHome", {
            user: dbRes,
            trips: tripDbRes,
            css: ["userHome"]
          });
        });
    })
    .catch(err => console.log(err));
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
