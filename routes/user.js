const express = require("express");
const router = express.Router();

//bring in the user model
let User = require("../models/users");

//register form
router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
