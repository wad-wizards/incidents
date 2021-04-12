module.exports = function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user) return next();
  res.redirect(`/users/login?redirect=${req.originalUrl}`);
};
