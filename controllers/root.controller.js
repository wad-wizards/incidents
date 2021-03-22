const Incident = require("../models/incident.model");

/*
Landing Page: 
- Render index view
- Pass array containing all incidents on db into view 
*/
const displayLandingPage = async (req, res) => {
  const incidentsData = await Incident.find({});
  res.render("index", { title: "Incidents", incidentsData: incidentsData });
};

const displayNotFoundPage = (req, res) =>
  res.render("not-found", { title: "404" });

module.exports = {
  displayLandingPage,
  displayNotFoundPage,
};
