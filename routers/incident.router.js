const express = require("express");
const controller = require("../controllers/incident.controller");

const router = express.Router();

router
  .route("/incidents/new")
  .get(controller.displayCreateIncidentPage)
  .post(controller.createIncident);

router
  .route("/incidents/:id/edit")
  .get(controller.displayUpdateIncidentPage)
  .post(controller.updateIncident);

router.get("/incidents/:id/delete", controller.deleteIncident);

module.exports = router;
