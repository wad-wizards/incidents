const express = require("express");
const controller = require("../controllers/user.controller");

const router = express.Router();

router
  .route("/users/sign-up")
  .get(controller.displaySignUpPage)
  .post(controller.signUp);

router
  .route("/users/login")
  .get(controller.displayLoginPage)
  .post(controller.login);

router
  .route("/users/edit-profile")
  .get(controller.displayEditProfilePage)
  .post(controller.editProfile);

module.exports = router;
