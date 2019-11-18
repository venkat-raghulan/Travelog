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
  ],
  // trips: [{type: Schema.Types.ObjectId, ref: 'Trip'}] 
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

