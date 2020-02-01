const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  region: { type: Schema.Types.ObjectId, ref:'Region', required: true },
  creator: { type: String },
  createdDate: { type: String },
  condition: { type: String }
});

module.exports = model("Monument", schema);
