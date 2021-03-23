const passport = require("passport");
const User = require("../models/user.model");
const helpers = require("./helpers");

const displaySignUpPage = (req, res) => {
  helpers.signUp.renderSignUpView(res);
};

const signUp = async (req, res) => {
  try {
    const { password, ...payload } = req.body;
    await User.register(payload, password);
    res.redirect("/login");
  } catch (error) {
    helpers.signUp.renderSignUpView(res, {
      errors: helpers.signUp.getSignUpErrorMessages(error),
    });
  }
};

const displayLoginPage = (req, res, next) => {
  res.render("users/login", {
    title: "Login",
    errors: req.flash("error"),
  });
};

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/login",
  failureFlash: true,
});

const logout = (req, res) => {
  req.logout();
  res.redirect("/");
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
  logout,
  displayEditProfilePage,
  editProfile,
};
