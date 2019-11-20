const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  tripID: { type: Schema.Types.ObjectId, ref: "Trip" },
  date: Date,
  batchName: { batch: String, details: String },
  sessionName: { name: String, timings: String },
  trainer: { type: Schema.Types.ObjectId, ref: "User" },
  topic: String
});

const scheduleModel = mongoose.model("Schedule", scheduleSchema);

module.exports = scheduleModel;
