const constants = require("../constants");
const { nanoid } = require("nanoid");

module.exports = {
  generateRecordNumber() {
    const now = new Date();
    const year = String(now.getUTCFullYear()).substring(0, 2);
    const month = now.getUTCMonth() + 1;
    const day = now.getUTCDate();
    const randomId = nanoid(6);

    return `${day}${month}${year}-${randomId}`;
  },
  getUserFormErrorMessage(error) {
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
  signUp: {
    renderSignUpView(res, params = {}) {
      res.render("users/sign-up", {
        title: "Sign Up",
        ...params,
      });
    },
  },
  editProfile: {
    renderEditProfileView(res, params = {}) {
      res.render("users/edit-profile", {
        title: "Edit Profile",
        ...params,
      });
    },
  },
};
