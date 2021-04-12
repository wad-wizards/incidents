const express = require("express");
const incidentRouter = require("./incident.router");
const userRouter = require("./user.router");
const rootController = require("../controllers/root.controller");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

const router = express.Router();

router.get("/", ensureLoggedIn, rootController.displayLandingPage);

router.use(incidentRouter);

router.use(userRouter);

router.get("*", rootController.displayNotFoundPage);

module.exports = router;
