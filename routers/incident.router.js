const express = require("express");
const controller = require("../controllers/incident.controller");

const router = express.Router();

const ensureLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/users/login");
};

router
  .route("/incidents/new")
  .get(ensureLoggedIn, controller.displayCreateIncidentPage)
  .post(ensureLoggedIn, controller.createIncident);

router
  .route("/incidents/:id/edit")
  .get(ensureLoggedIn, controller.displayUpdateIncidentPage)
  .post(ensureLoggedIn, controller.updateIncident);

router.get("/incidents/:id/delete", ensureLoggedIn, controller.deleteIncident);

module.exports = router;
