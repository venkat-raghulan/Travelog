require("dotenv").config();
require("./config/mongo");
require("./utils/hbs_helpers");

const express = require("express");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
// These are all the packages we require for the sevrer.

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

hbs.registerPartials(path.join(__dirname, "views/partials"));

// Sets the app server to use the main router.
const mainRouter = require("./routes/main");
const signin = require("./routes/auth/signin");
app.use(mainRouter);
app.use(signin);

app.listen(process.env.PORT, () => {
  console.log(`app started at ${process.env.SITE_URL}:${process.env.PORT}`);
});
