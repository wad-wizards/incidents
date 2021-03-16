const express = require("express");
const controller = require("./controllers/incident");

const router = express.Router();

router.get("/", controller.displayLandingPage);

router
  .route("/incidents/new")
  .get(controller.displayCreateIncidentPage)
  .post(controller.createIncident);

router
  .route("/incidents/:id/edit")
  .get(controller.displayUpdateIncidentPage)
  .post(controller.updateIncident);

router.get("/incidents/:id/delete", controller.deleteIncident);

router.get("*", controller.displayNotFoundPage);

module.exports = router;
