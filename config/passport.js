const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const config = require("./database");
const bcrypt = require("bcryptjs");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(function(username, password, done) {
      //match email
      let query = { username: username };

      User.findOne(query, (err, user) => {
        if (err) {
          console.log(err);
        }
        if (!user) {
          return done(null, false, { message: "No user found" });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "wrong password" });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
