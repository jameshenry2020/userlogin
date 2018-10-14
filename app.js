const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

//establishing a database connection
mongoose.connect("mongodb://localhost/loginsystem");
let db = mongoose.connection;
//check database connection
db.once("open", () => {
  console.log("database connection successful");
});
db.on("error", err => {
  console.log(err);
});

// initializing our application
const app = express();

//load veiw engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

//starting our server
app.listen(3000, () => {
  console.log("server starting at port 3000....");
});
