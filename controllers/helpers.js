const constants = require("../constants");

module.exports = {
  signUp: {
    renderSignUpView(res, params = {}) {
      res.render("users/sign-up", {
        title: "Sign Up",
        userTypes: constants.userTypes,
        ...params,
      });
    },
    getSignUpErrorMessages(error) {
      if (error.code && error.code === 11000) {
        const key = Object.keys(error.keyValue)[0];
        const value = error.keyValue[key];
        return [`${key} "${value}" taken.`];
      }

      if (!error.errors) return [error.message];

      return Object.values(error.errors).map(({ message }) =>
        message.replace("Path ", "").replace(/`/g, "")
      );
    },
  },
};
