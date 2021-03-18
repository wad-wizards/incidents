const Incident = require("../models/incident");

/*
Landing Page: 
- Render index view
- Pass array containing all incidents on db into view 
*/
const displayLandingPage = (req, res) => {
  res.render("index", { title: "Express" });
};

/*
"Create Incident" Page: 
- Render create incident view
*/
const displayCreateIncidentPage = (req, res) => {
  res.render("incidents/create", { title: "Create Incident" });
};

/*
"Create Incident" Handler: 
- Create new incident on database using form data
- Redirect back to landing page
*/
const createIncident = (req, res) => {
  const formData = req.body;
  let newIncident = Incident({
    title: formData.title,
    description: formData.description,
    priority: formData.priority,
  });

  Incident.create(newIncident, (err, Incident) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/");
    }
  });
};

/*
"Update Incident" Page:
- Render update incident view
- Check if incident with specified id exists:
  - If exists, pass object containing incident data into view
  - If not, redirect to /not-found
*/
const displayUpdateIncidentPage = (req, res) => {
  const incidentId = req.params.id;
};

/*
"Update Incident" Handler: 
- Check if incident with specified id exists:
  - If exists, update incident on db using form data
  - If not, redirect to /not-found
- Redirect to landing page
*/
const updateIncident = (req, res) => {
  const incidentId = req.params.id;
  const formData = req.body;
};

/*
"Delete Incident" Handler: 
- Check if incident with specified id exists:
  - If exists, delete incident from db
  - If not, redirect to /not-found
*/
const deleteIncident = async (req, res) => {
  const incidentId = req.params.id;
  const doesIncidentExist = await Incident.exists({ _id: incidentId });

  if (!doesIncidentExist) return res.redirect("/not-found");

  await Incident.deleteOne({ _id: incidentId });
  return res.redirect("/");
};

const displayNotFoundPage = (req, res) =>
  res.render("not-found", { title: "404" });

module.exports = {
  displayLandingPage,
  displayCreateIncidentPage,
  createIncident,
  displayUpdateIncidentPage,
  updateIncident,
  deleteIncident,
  displayNotFoundPage,
};
