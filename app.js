const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const config = require("./config/database");

//establishing a database connection
mongoose.connect(config.database);
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
//setup the public folder
app.use(express.static(path.join(__dirname, "public")));
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

app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

//passport
require("./config/passport")(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//route files
let users = require("./routes/user");
app.use("/users", users);

//starting our server
app.listen(3000, () => {
  console.log("server starting at port 3000....");
});
