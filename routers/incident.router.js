const express = require("express");
const controller = require("../controllers/incident.controller");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

const router = express.Router();

router
  .route("/incidents/new")
  .get(ensureLoggedIn, controller.displayCreateIncidentPage)
  .post(ensureLoggedIn, controller.createIncident);

router
  .route("/incidents/:id/edit")
  .get(ensureLoggedIn, controller.displayUpdateIncidentPage)
  .post(ensureLoggedIn, controller.updateIncident);

router
  .route("/incidents/:id/view")
  .get(ensureLoggedIn, controller.displayIncidentPage);

router.get("/incidents/:id/delete", ensureLoggedIn, controller.deleteIncident);

module.exports = router;
