const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  tripID: String,
  oifID: String,
  college: {
    type: Schema.Types.ObjectId,
    ref: "College"
  },
  tripDates: [{ type: Date }],
  numberOfBatches: Number,
  sessionInfo: [{ name: String, timings: String }],
  trainers: [{ type: Schema.Types.ObjectId, ref: "user" }]
});

const tripModel = mongoose.model("trip", tripSchema);

module.exports = tripModel;
