const constants = require("../constants");
const { formatDistanceToNow } = require("date-fns");

module.exports = function setViewGlobals(req, res, next) {
  Object.assign(res.locals, {
    user: req.user || null,
    constants,
    renderSelect,
    slug,
    timestamp,
    capitalize,
    sortByDescCreatedAt
  });

  next();
};

const renderSelect = ({ name, options = [], selected, id }) => {
  const maybeSelectedAttr = (option) => (selected === option ? "selected" : "");
  const renderedOptions = options
    .map(
      (option) =>
        `<option 
            value="${option}" 
            ${maybeSelectedAttr(option)}
          >
            ${option}
          </option>`
    )
    .join("");
  const maybeIdAttr = id ? `id="${id}"` : "";
  return `<select name="${name}" ${maybeIdAttr}>${renderedOptions}</select>`;
};

const slug = (str) => str.toLowerCase().replace(/\s/g, "-");

const timestamp = (date) => formatDistanceToNow(date, { addSuffix: true });

const capitalize = str => str.replace(
  /\w\S*/g,
  (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
);

const sortByDescCreatedAt = records => records.sort((a , b) => b.createdAt - a.createdAt);