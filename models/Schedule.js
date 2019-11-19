const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  tripID: { type: Schema.Types.ObjectId, ref: "Trip" },
  date: Date,
  batchName: String,
  sessionName: { name: String, timings: String },
  trainer: { type: Schema.Types.ObjectId, ref: "User" },
  topic: String,
  scheduleStatus: {
    type: Boolean,
    default: false
  }
});

const collegeModel = mongoose.model("College", collegeSchema);

module.exports = collegeModel;
