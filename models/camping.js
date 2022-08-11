const mongoose = require("mongoose");

const CampingSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

module.exports = mongoose.model("Camping", CampingSchema);
