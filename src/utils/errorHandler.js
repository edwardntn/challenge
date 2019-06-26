const HTTPStatuses = require('http-status');
const logger = require('./logger');

module.exports = (err, req, res, next) => {
  const status = err.status || HTTPStatuses.INTERNAL_SERVER_ERROR;
  const body = {
    message: err.message,
    status
  };

  if (status > 499) {
    logger.error('Error happened', err);
    body.message = 'Error happened';
  }

  logger.error(err.message || err);

  res.status(status).send(body);
};
