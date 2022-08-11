const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const db = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/camping-greece", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connection with database established."));

app.set("view engine", "ejs");
app.set("vies", path.join(__dirname, "views"));

app.get("/", (request, respond) => {
  respond.render("index");
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
