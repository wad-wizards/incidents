const passport = require("passport");
const User = require("../models/user.model");

module.exports = (app) => {
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  app.use(passport.initialize());
  app.use(passport.session());
};
