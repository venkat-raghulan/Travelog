const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("signin", {
    css: ["signin", "reset"]
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    css: ["signup", "reset"]
  });
});

module.exports = router;
