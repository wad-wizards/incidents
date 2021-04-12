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
      enum: constants.incidents.priorities,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    recordNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: constants.incidents.statuses,
      required: true,
      default: "Created",
    },
    resolution: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Incident", schema);
