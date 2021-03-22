const passport = require("passport");
const User = require("../models/user.model");
const helpers = require("./helpers");

const displaySignUpPage = (req, res) => {
  helpers.signUp.renderSignUpView(res);
};

const signUp = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/users/login");
  } catch (error) {
    helpers.signUp.renderSignUpView(res, {
      errors: helpers.signUp.getSignUpErrorMessages(error),
    });
  }
};

const displayLoginPage = (req, res, next) => {
  //Check if user is logged in
  if (!req.user) {
    res.render("users/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
    });
  } else {
    return res.redirect("/");
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //server error
    if (err) {
      return next(err);
    }
    //is there a user login error
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      //server error
      if (err) {
        return next(err);
      }
      return res.redirect("/incidents");
    });
  })(req, res, next);
};

const displayEditProfilePage = (req, res) => {
  res.render("users/edit-profile", { title: "Edit Profile" });
};

const editProfile = (req, res) => {};

module.exports = {
  displaySignUpPage,
  signUp,
  displayLoginPage,
  login,
  displayEditProfilePage,
  editProfile,
};
