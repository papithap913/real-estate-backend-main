const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "Available" }, // Available or Sold
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Agent who listed the property
});

const Property = mongoose.model("Property", PropertySchema);
module.exports = Property;
