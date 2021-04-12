const Incident = require("../models/incident.model");
const Narrative = require("../models/narrative.model");
const helpers = require("./helpers");

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
const createIncident = async (req, res) => {
  const formData = req.body;
  const data = {
    ...formData,
    recordNumber: helpers.generateRecordNumber(),
  };
  await Incident.create(data);
  res.redirect("/");
};

/*
"Update Incident" Page:
- Render update incident view
- Check if incident with specified id exists:
  - If exists, pass object containing incident data into view
  - If not, redirect to /not-found
*/
const displayUpdateIncidentPage = async (req, res) => {
  const recordNumber = req.params.id;
  const incident = await Incident.findOne({ recordNumber });
  if (!incident) return res.redirect("/not-found");

  res.render("incidents/update", {
    title: "Update Incident",
    incident,
  });
};

/*
"Update Incident" Handler: 
- Check if incident with specified id exists:
  - If exists, update incident on db using form data
  - If not, redirect to /not-found
- Redirect to landing page
*/
const updateIncident = async (req, res) => {
  const recordNumber = req.params.id;
  const { narrative, ...formData } = req.body;

  const incident = await Incident.findOne({ recordNumber });
  if (!incident) return res.redirect("/not-found");

  const changes = helpers.objectDiff(incident.toObject(), formData);
  
  await Incident.updateOne({ recordNumber }, formData);
  await Narrative.create({
    narrative,
    changes,
    incident: incident._id,
    author: req.user._id
  });

  res.redirect(`/incidents/${recordNumber}`);
};

/*
"Delete Incident" Handler: 
- Check if incident with specified id exists:
  - If exists, delete incident from db
  - If not, redirect to /not-found
*/
const deleteIncident = async (req, res) => {
  const recordNumber = req.params.id;
  const doesIncidentExist = await Incident.exists({ recordNumber });

  if (!doesIncidentExist) return res.redirect("/not-found");

  await Incident.deleteOne({ recordNumber });
  return res.redirect("/");
};

const displayIncidentPage = async (req, res) => {
  const recordNumber = req.params.id;
  const incident = await Incident.findOne({ recordNumber });
  
  if (!incident) return res.redirect("/not-found");

  const narratives = await Narrative.find({ incident: incident._id }).populate("author");
  
  res.render("incidents/incident", { incident, narratives });
};

module.exports = {
  displayCreateIncidentPage,
  createIncident,
  displayUpdateIncidentPage,
  updateIncident,
  deleteIncident,
  displayIncidentPage
};
