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
      console.log("here");
      console.log(dbRes);
      res.render("plannerHome", {
        trips: dbRes,
        css: ["adminHome", "main", "reset"]
      });
    })
    .catch();
});
