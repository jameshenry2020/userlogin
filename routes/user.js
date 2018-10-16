const express = require("express");
const router = express.Router();

//bring in the user model
let User = require("../models/users");

//register form
router.get("/register", (req, res) => {
  res.render("register");
});

//register process
router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
});

module.exports = router;
