const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const flash = require("connect-flash");
const passport = require("passport");

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
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  User.findOne({ email: email }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      if (doc) {
        req.flash("danger", "email already in use");
        res.render("/register");
      } else {
        let newUser = new User({
          name: name,
          email: email,
          username: username,
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
                return;
              } else {
                req.flash(
                  "success",
                  "registration successful you can now login in"
                );
                res.redirect("/users/login");
              }
            });
          });
        });
      }
    }
  });
});

// login form...

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
