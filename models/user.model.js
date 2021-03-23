const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const constants = require("../constants");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: constants.userTypes,
    required: true,
  },
});

/**
 * The passport-local-mongoose library provides the following fields to the schema:
 *  - username
 *  - hash (hashed password field)
 *  - salt (salt used in hashing password)
 */
schema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", schema);
