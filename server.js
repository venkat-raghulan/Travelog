require("dotenv").config();
require("./config/mongo");
require("./utils/hbs_helpers");

const express = require("express");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 60000
    }
  })
);

app.use(flash());

app.use(function(req, res, next) {
  res.locals.sessionFlash = req.session.sessionFlash;
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

hbs.registerPartials(path.join(__dirname, "views/partials"));

// Sets the app server to use the main router.
const mainRouter = require("./routes/main");
const auth = require("./routes/auth/auth");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const plannerRouter = require("./routes/planner");
app.use(mainRouter);
app.use(auth);
app.use(userRouter);
app.use(adminRouter);
app.use(plannerRouter);

app.listen(process.env.PORT, () => {
  console.log(`app started at ${process.env.SITE_URL}:${process.env.PORT}`);
});
