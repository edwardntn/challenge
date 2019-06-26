const HHTPStatuses = require('http-status');

module.exports = (req, res, next) => {
  const status = HHTPStatuses.NOT_FOUND;
  const message = HHTPStatuses[404];

  res.status(status);

  if (req.accepts('json')) {
    return res.json({
      status,
      error: message
    });
  }

  if (req.accepts('html')) {
    return res.send(message);
  }

  res.type('txt');
  return res.send(message);
};
