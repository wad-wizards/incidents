const express = require("express");
const controller = require("../controllers/user.controller");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");
const ensureNotLoggedIn = require("../middleware/ensureNotLoggedIn");

const router = express.Router();

router
  .route("/users/sign-up")
  .get(ensureNotLoggedIn, controller.displaySignUpPage)
  .post(ensureNotLoggedIn, controller.signUp);

router
  .route("/users/login")
  .get(ensureNotLoggedIn, controller.displayLoginPage)
  .post(ensureNotLoggedIn, controller.login);

router
  .route("/users/edit-profile")
  .get(ensureLoggedIn, controller.displayEditProfilePage)
  .post(ensureLoggedIn, controller.editProfile);

router.get("/users/logout", ensureLoggedIn, controller.logout);

module.exports = router;
