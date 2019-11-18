const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  profilePicture: String,
  employeeID: String,
  email: String,
  contactNumber: String,
  password: String,
  userType: {
    type: String,
    enum: ["Admin", "Planner", "Manager", "BDM"],
    default: "BDM"
  },
  trips: Schema.Types.ObjectId
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

// trainer as a role in usertype
// read me file with .env details
// should we store trips in user table - we can decide on this later?
