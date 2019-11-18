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
        css: ["adminHome", "main"]
      });
    })
    .catch(err => console.log(err));
});
