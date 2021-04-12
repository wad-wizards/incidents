const Incident = require("../models/incident.model");
const Narrative = require("../models/narrative.model");
const Comment = require("../models/comment.model");
const helpers = require("./helpers");

const getIncidentFromReq = async req => {
  const recordNumber = req.params.id;
  const incident = await Incident.findOne({ recordNumber });
  if (!incident) return res.redirect("/not-found");
  return incident;
}

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
  const incident = await getIncidentFromReq(req);
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
  const { narrative, ...formData } = req.body;

  const incident = await getIncidentFromReq(req);
  const { recordNumber } = incident;

  const changes = helpers.objectDiff(incident.toObject(), formData);
  const isClosingIncident = changes.status && changes.status.next === "Closed";
  
  await Incident.updateOne({ recordNumber }, {
    ...formData,
    resolution: isClosingIncident ? narrative : null
  });
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
  const incident = await getIncidentFromReq(req);
  const narratives = await Narrative.find({ incident: incident._id }).populate("author");
  const comments = await Comment.find({ incident: incident._id }).populate("author");
  
  res.render("incidents/incident", { incident, narratives, comments });
};

const createComment = async (req, res) => {
  const incident = await getIncidentFromReq(req);
  await Comment.create({
    comment: req.body.comment,
    author: req.user._id,
    incident: incident._id,
  });

  res.redirect(`/incidents/${incident.recordNumber}#comments`);
}

module.exports = {
  displayCreateIncidentPage,
  createIncident,
  displayUpdateIncidentPage,
  updateIncident,
  deleteIncident,
  displayIncidentPage,
  createComment
};
