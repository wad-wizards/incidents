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
    res.redirect("/users/login");
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
  const { _id, username, email, type } = req.user;
  helpers.editProfile.renderEditProfileView(res, { ...req.user });
};

const editProfile = async (req, res) => {
  try{
    const formData = req.body;
    let userId = req.user._id;
    let updatedUserModel = {
      username: formData.username,
      email: formData.email,
      type: formData.type,
      password: formData.password
    };
    
    let updatedUser = await User.findOneAndUpdate({ _id: userId }, updatedUserModel);
    
    if(updatedUser) {
      User.findByUsername(formData.username).then(function(sanitizedUser) {
        if(sanitizedUser) {
          sanitizedUser.setPassword(formData.password, function() {
            sanitizedUser.save();
            res.redirect("/users/edit-profile");
          })
        } else {
          res.redirect("/");
        }
      });
    } else {
      res.redirect("/");
    }

  } catch (error) {
    helpers.editProfile.getEditProfileErrorMessages(res, {
      errors: helpers.editProfile.getEditProfileErrorMessages(error),
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
