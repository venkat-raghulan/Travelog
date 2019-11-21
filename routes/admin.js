const express = require("express");
const router = express.Router();
const userModel = require("./../models/User.js");
const collegeModel = require("./../models/College");
module.exports = router;

router.get("/admin", (req, res, next) => {
  collegeModel
    .find()
    .then(dbRes1 => {
      userModel
        .find()
        .then(dbRes => {
          res.render("adminHome", {
            user: req.session.currentUser,
            users: dbRes,
            colleges: dbRes1,
            css: ["adminHome", "main", "userHome"],
            scripts: ["adminHome"]
          });
        })
        .catch(dbErr => console.log(dbErr));
    })
    .catch(dbErr1 => console.log(dbErr1));
});

router.get("/create-college", (req, res, next) => {
  userModel
    .find({ userType: "BDM" })
    .then(dbRes => {
      console.log(dbRes);
      res.render("../views/forms/college-create.hbs", {
        user: req.session.currentUser,
        bdmList: dbRes,
        css: ["userProfile"]
      });
    })
    .catch(dbErr => console.log(dbErr));
});
