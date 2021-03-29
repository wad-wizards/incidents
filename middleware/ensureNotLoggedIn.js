module.exports = function ensureNotLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
};
