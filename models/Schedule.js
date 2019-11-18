const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  tripID: { type: Schema.Types.ObjectId, ref: "Trip" },
  date: Date,
  sessionName: String,
  batchName: { name: String, details: String },
  trainer: { type: Schema.Types.ObjectId, ref: "User" },
  topic: String
});

const collegeModel = mongoose.model("College", collegeSchema);

module.exports = collegeModel;
