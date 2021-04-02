const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

module.exports = (app) => {
  app.use(
    session({
      secret: "SomeSecret",
      saveUninitialized: false,
      resave: false,
      store: MongoStore.create({ client: mongoose.connection.getClient() }),
    })
  );
}