const mongoose = require("mongoose");
const constants = require("../constants");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: constants.incidentPriorities,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Incident", schema);
