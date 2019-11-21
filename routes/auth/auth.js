const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const userSchema = require("../../models/User");
const zxcPassword = require("zxcvbn");

router.post("/signup", (req, res, next) => {
  const user = req.body;

  userSchema
    .findOne({ email: user.email })
    .then(dbRes => {
      if (dbRes) {
        res.redirect("/");
        return;
      }

      const passwordsStrength = zxcPassword(user.password);

      // if (passwordsStrength.score <= ) {
      //   req.flash("error", "Please enter a better password");
      //   res.redirect("/signup");
      // }

      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(user.password, salt);
      user.password = hashed;

      userSchema
        .create(user)
        .then(() => {
          res.redirect("/");
        })
        .catch(dbErr => console.log(dbErr));
    })
    .catch(err => console.log(err));
});

router.post("/", (req, res, next) => {
  const user = req.body;
  userSchema
    .findOne({ email: user.email })
    .then(dbRes => {
      if (!dbRes) {
        res.redirect("/");
      }
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        req.session.currentUser = dbRes;
        return res.redirect("/home");
      } else {
        return res.redirect("/");
      }
    })
    .catch(dbErr => console.log(dbErr));
});

module.exports = router;
