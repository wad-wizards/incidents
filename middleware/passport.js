const passport = require("passport");
const User = require("../models/user.model");

const serializeUser = (user, cb) => cb(null, user._id);
const deserializeUser = (userId, cb) => User.findById(userId, cb);

module.exports = (app) => {
  passport.use(User.createStrategy());
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  app.use(passport.initialize());
  app.use(passport.session());
};
