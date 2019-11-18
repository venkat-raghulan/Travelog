const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
  collegeID: String,
  collegeName: String,
  collegeAddress: String,
  city: String,
  BDM: { type: Schema.Types.ObjectId, ref: 'User'},
  collegeSPOC: { name: String, phone: String }
});

const collegeModel = mongoose.model("College", collegeSchema);

module.exports = collegeModel;
