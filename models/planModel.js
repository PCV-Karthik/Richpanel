const mongoose = require("mongoose");

const planSchema = mongoose.Schema({
  period: { type: String },
  name: { type: String },
  price: { type: Number },
  quality: { type: String },
  resolution: { type: String },
  devices: [{ type: String }],
  api:{type:String}
});

module.exports = mongoose.model("Plan", planSchema);
