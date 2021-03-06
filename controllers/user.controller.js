const passport = require("passport");
const User = require("../models/user.model");
const helpers = require("./helpers");

const displaySignUpPage = (req, res) => {
  //helpers.signUp.renderSignUpView(res);
  res.render("users/sign-up", {
    title: "Sign Up",
    //errors: req.flash("error"),
  });
};

const signUp = async (req, res) => {
  try {
    const { password, ...payload } = req.body;
    await User.register(payload, password);
    res.redirect("/users/login");
  } catch (error) {
    helpers.signUp.renderSignUpView(res, {
      errors: helpers.getUserFormErrorMessage(error),
    });
  }
};

const displayLoginPage = (req, res) => {
  res.render("users/login", {
    title: "Login",
    errors: req.flash("error"),
  });
};

const login = (req, res) => {
  const { redirect: successRedirect = "/" } = req.query;
  const failureRedirect = `/users/login?redirect=${successRedirect}`;

  passport.authenticate("local", {
    successRedirect,
    failureRedirect,
    failureFlash: true,
  })(req, res);
};

const logout = async (req, res) => {
  await req.logout();
  res.redirect("/");
};

const displayEditProfilePage = (req, res) => {
  helpers.editProfile.renderEditProfileView(res, { user: req.user });
};

const editProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { password, ...updates } = req.body;

    const user = await User.findOneAndUpdate({ _id: userId }, updates, {
      returnOriginal: false,
      runValidators: true,
    });

    if (password) {
      await user.setPassword(password);
      await user.save();
    }

    helpers.editProfile.renderEditProfileView(res, {
      user,
      success: true,
    });
  } catch (error) {
    helpers.editProfile.renderEditProfileView(res, {
      errors: helpers.getUserFormErrorMessage(error),
    });
  }
};

module.exports = {
  displaySignUpPage,
  signUp,
  displayLoginPage,
  login,
  logout,
  displayEditProfilePage,
  editProfile,
};
