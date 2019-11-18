const express = require("express");
const router = express.Router();

router.get("/admin", (req, res, next) => {
  res.render("adminHome", {
    css: ["adminHome", "reset"],
    scripts: ["adminHome"]
  });
});

module.exports = router;
