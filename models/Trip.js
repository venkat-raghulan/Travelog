const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  tripID: String,
  oifID: String,
  college: {
    type: String,
    ref: "College"
  },
  tripDates: [{ type: Date }],
  numberOfBatches: Number,
  sessionInfo: Array,
  trainers: [{ type: Schema.Types.ObjectId, ref: Users }]
});

const tripModel = mongoose.model("user", userSchema);

module.exports = tripModel;
