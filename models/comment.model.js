const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Incident',
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", schema);