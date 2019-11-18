const express = require("express");
const router = express.Router();
const userModel = require("./../models/User.js");
const collegeModel = require("./../models/College");
module.exports = router;

router.get("/admin", (req, res, next) => {
  collegeModel
    .find()
    .then(dbRes1 => {
      userModel.find().then(dbRes => {
        console.log("here");
        console.log(dbRes);
        res
          .render("adminHome", {
            users: dbRes,
            colleges: dbRes1,
            css: ["adminHome", "main", "reset"],
            scripts: ["adminHome"]
          })
          .catch(dbErr => console.log(dbErr));
      });
    })
    .catch(dbErr1 => console.log(dbErr1));
});
