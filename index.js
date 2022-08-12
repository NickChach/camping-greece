const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Camping = require("./models/camping");

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

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (request, respond) => {
  respond.render("index");
});

app.get("/campings", async (request, respond) => {
  const campings = await Camping.find({});
  respond.render("campings/index", { campings });
});

app.post("/campings", async (request, respond) => {
  const camping = new Camping(request.body);
  await camping.save();
  respond.redirect(`/campings/${camping._id}`);
});

app.get("/campings/new", (request, respond) => {
  respond.render("campings/new");
});

app.get("/campings/:id", async (request, respond) => {
  const camping = await Camping.findById(request.params.id);
  respond.render("campings/details", { camping });
});

app.put("/campings/:id", async (request, respond) => {
  const camping = await Camping.findByIdAndUpdate(request.params.id, { title: request.body.title, location: request.body.location });
  respond.redirect(`/campings/${camping._id}`);
});

app.delete("/campings/:id", async (request, respond) => {
  await Camping.findByIdAndDelete(request.params.id);
  respond.redirect("/campings");
});

app.get("/campings/:id/edit", async (request, respond) => {
  const camping = await Camping.findById(request.params.id);
  respond.render("campings/edit", { camping });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
