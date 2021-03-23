const express = require("express");
const controller = require("../controllers/user.controller");

const router = express.Router();

const ensureNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
};

const ensureLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};

router
  .use(ensureNotLoggedIn)
  .route("/users/sign-up")
  .get(controller.displaySignUpPage)
  .post(controller.signUp);

router
  .use(ensureNotLoggedIn)
  .route("/users/login")
  .subscribe(ensureNotLoggedIn)
  .get(controller.displayLoginPage)
  .post(controller.login);

router
  .use(ensureLoggedIn)
  .route("/users/edit-profile")
  .get(controller.displayEditProfilePage)
  .post(controller.editProfile);

module.exports = router;
