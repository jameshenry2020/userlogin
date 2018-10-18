const express = require("express");
const router = express.Router();
const bcrypt = required("bcryptjs");

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

  check("name", "name is required")
    .trim()
    .not(),
    check("email")
      .not()
      .exists()
      .withMessage("email is required"),
    check("email")
      .isEmail()
      .withMessage("invalid email"),
    check("password")
      .not()
      .exists()
      .withMessage("password is required"),
    check("password2")
      .equals("req.body.password")
      .withMessage("password do not match");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("register", {
      errors: errors
    });
  } else {
    let newUser = new User({
      name: name,
      email: email,
      password: password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(err => {
          if (err) {
            console.log(err);
          } else {
            req.flash("success", "you are now registerd and can login");
            res.redirect("/users/login");
          }
        });
      });
    });
  }
});

module.exports = router;
