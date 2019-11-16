const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});

mongoose.connection.on("error", () =>
  console.log("Error on Connecting to the Database")
);
