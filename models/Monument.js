const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  region: { type: Schema.Types.ObjectId, ref:'Region' },
  creator: { type: String },
  createdDate: { type: String },
  condition: { type: Schema.Types.ObjectId, ref:'Condition' },
  description: {type: String}
});

module.exports = model("Monument", schema);
