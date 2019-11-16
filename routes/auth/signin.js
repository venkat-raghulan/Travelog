const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("signin", {
    css: ["signin", "reset"]
  });
});

module.exports = router;
