const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  region: { type: String, required: true },
  creator: { type: String },
  createdDate: { type: Date },
  condition: { type: String }
});

module.exports = model("monument", schema);
