const { StatusCodes } = require('http-status-codes');
const { logger } = require('../config');
const AppError = require('../utils/errors/app-error');
const { ErrorResponse } = require('../utils/common');

// 404 for any route that didn't match
function notFound(req, res) {
  const error = new AppError([`Route ${req.method} ${req.originalUrl} not found`], StatusCodes.NOT_FOUND);
  return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse('Route not found', error));
}

// Central error handler: every thrown / next(err) error ends up here.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // AppError -> statusCode, body-parser errors (e.g. bad JSON) -> status
  const statusCode = err.statusCode || err.status || StatusCodes.INTERNAL_SERVER_ERROR;

  if (statusCode >= 500) {
    logger.error(`${req.method} ${req.originalUrl} -> ${err.stack || err}`);
  }

  // Never leak internals of unexpected errors to the client
  let safeError;
  if (err instanceof AppError) {
    safeError = err;
  } else if (statusCode < 500) {
    safeError = new AppError([err.message], statusCode);
  } else {
    safeError = new AppError(['Internal server error'], StatusCodes.INTERNAL_SERVER_ERROR);
  }

  return res
    .status(statusCode)
    .json(ErrorResponse('Something went wrong while processing the request', safeError));
}

module.exports = { notFound, errorHandler };
