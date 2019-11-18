const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
  collegeID: String,
  collegeName: String,
  collegeAddress: String,
  city: String,
  BDM: { type: Schema.Types.ObjectId, ref: Users },
  collegeSPOC: { name: String, phone: String }
});

const collegeModel = mongoose.model("user", userSchema);

module.exports = collegeModel;
