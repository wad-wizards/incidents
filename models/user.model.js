const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const constants = require("../constants");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: "email is required",
    unique: true,
    trim: true,
  },
  type: {
    type: String,
    enum: constants.userTypes,
    required: true,
  },
  username: {
    type: String,
    required: "user name is required",
    unique: true,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  update: {
    type: Date,
    default: Date.now,
  },
});

/**
 * The passport-local-mongoose library provides the following fields to the schema:
 *  - username
 *  - hash (hashed password field)
 *  - salt (salt used in hashing password)
 */

//configure options for user.model

let options = { missingPasswordError: "Wrong/Missing Password" };
schema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", schema);
