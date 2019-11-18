const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  profilePicture: String,
  employeeID: String,
  email: String,
  contactNumber: String,
  password: String,
  userType: [
    {
      type: String,
      enum: ["Admin", "Planner", "BDM", "Trainer"],
      default: "BDM"
    }
  ]
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
