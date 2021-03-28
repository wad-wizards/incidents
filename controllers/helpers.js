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
  editProfile: {
    renderEditProfileView(res, params = {}) {
      console.log(params);
      res.render("users/edit-profile", {
        title: "Edit Profile",
        userTypes: constants.userTypes,
        _id: params._doc._id,
        username: params._doc.username,
        type: params._doc.type,
        email: params._doc.email,
        password: "",
        ...params
      });
    },
    getEditProfileErrorMessages(error) {
      if (error.code && error.code === 11000) {
        const key = Object.keys(error.keyValue)[0];
        const value = error.keyValue[key];
        return [`${key} "${value}" taken.`];
      }

      if (!error.errors) return [error.message];

      return Object.values(error.errors).map(({ message }) =>
        message.replace("Path ", "").replace(/`/g, "")
      );
    }

  }
};
