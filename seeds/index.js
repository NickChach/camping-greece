const mongoose = require("mongoose");
const Camping = require("../models/camping");
const cities = require("./cities");

const db = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/camping-greece", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connection with database established."));

const seedDB = async () => {
  await Camping.deleteMany({});
  for (let city of cities) {
    const camp = new Camping({
      title: `${city.city} Resort`,
      location: `${city.city}`,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
