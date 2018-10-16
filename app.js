const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const { check, validationResult } = require("express-validator/check");

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
// session middleware
app.use(
  session({
    secret: "mySecret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(require("connect-flash")());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});
//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//load veiw engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

//route files
let users = require("./routes/user");
app.use("/users", users);

//starting our server
app.listen(3000, () => {
  console.log("server starting at port 3000....");
});
