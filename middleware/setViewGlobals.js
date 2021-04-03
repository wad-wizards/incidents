const constants = require("../constants");

module.exports = function setViewGlobals(req, res, next) {
  res.locals.constants = constants;
  res.locals.renderSelect = renderSelect;
  res.locals.user = req.user || null;
  next();
};

const renderSelect = ({ name, options = [], selected }) => {
  const maybeSelectedAttr = (option) => (selected === option ? "selected" : "");
  const renderedOptions = options
    .map(
      (option) =>
        `<option value="${option}" ${maybeSelectedAttr(
          option
        )}>${option}</option>`
    )
    .join("");
  return `<select name="${name}">${renderedOptions}</select>`;
};
