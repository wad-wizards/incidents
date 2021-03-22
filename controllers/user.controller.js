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

const displayLoginPage = (req, res) => {
  res.render("users/login", { title: "Login" });
};

const login = (req, res) => {};

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
