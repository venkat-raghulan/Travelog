const express = require("express");
const router = express.Router();
const userModel = require("./../models/User.js");
const collegeModel = require("./../models/College");
const bcrypt = require("bcrypt");
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
      // console.log(dbRes);
      res.render("../views/forms/college-create.hbs", {
        user: req.session.currentUser,
        bdmList: dbRes,
        css: ["userProfile"]
      });
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/create-user", (req, res, next) => {
  res.render("../views/forms/user-create.hbs", {
    user: req.session.currentUser,
    css: ["userProfile"]
  });
});

router.post("/create-user", (req, res, next) => {
  const user = req.body;

  userModel
    .findOne({ email: user.email })
    .then(dbRes => {
      if (dbRes) {
        res.redirect("/");
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(user.password, salt);
      user.password = hashed;

      userModel
        .create(user)
        .then(() => {
          res.redirect("/create-user");
        })
        .catch(dbErr => console.log(dbErr));
    })
    .catch(err => console.log(err));
});

router.post("/create-college", (req, res, next) => {
  let newCollege = {
    collegeID: req.body.collegeID,
    collegeName: req.body.collegeName,
    collegeAddress: req.body.collegeAddress,
    city: req.body.city,
    BDM: req.body.BDM,
    collegeSPOC: { name: req.body.spocName, phone: req.body.spocPhone }
  };

  collegeModel
    .findOne({ collegeID: req.body.collegeID })
    .then(dbRes => {
      if (dbRes) {
        res.redirect("/create-college");
        return;
      }
      collegeModel
        .create(newCollege)
        .then(() => {
          res.redirect("/create-college");
        })
        .catch(dbErr => console.log(dbErr));
    })
    .catch(err => console.log(err));
});

router.get("/edit-user/:id", (req, res, next) => {
  userModel
    .findById(req.params.id)
    .then(dbRes => {
      res.render("../views/forms/user-edit.hbs", {
        userEdit: dbRes,
        user: req.session.currentUser,
        css: ["userProfile"]
      });
    })
    .catch(dbErr => console.log(dbErr));
});

router.post("/edit-user/:id", (req, res, next) => {
  const userEdit = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(userEdit.password, salt);
  userEdit.password = hashed;
  console.log(userEdit);
  userModel
    .findByIdAndUpdate(req.params.id, userEdit, {
      new: true
    })
    .then(dbRes => res.redirect("/admin"))
    .catch(dbErr => console.log(dbErr));
});

router.get("/delete-user/:id", (req, res, next) => {
  userModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => console.log(dbRes))
    .catch(dbErr => console.log(dbErr));
});

router.get("/delete-college/:id", (req, res, next) => {
  collegeModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => console.log(dbRes))
    .catch(dbErr => console.log(dbErr));
});
