const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const VALID_FIELDS = ['name', 'description', 'status'];

function validateCreateExample(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new AppError(['No data found in the incoming request'], StatusCodes.BAD_REQUEST));
  }
  if (!req.body.name) {
    return next(new AppError(['name is not found or not valid in the incoming request'], StatusCodes.BAD_REQUEST));
  }
  next();
}

function validateUpdateExample(req, res, next) {
  const incomingFields = Object.keys(req.body || {});

  if (incomingFields.length === 0) {
    return next(new AppError(['No data found in the incoming request'], StatusCodes.BAD_REQUEST));
  }

  const invalidFields = incomingFields.filter((field) => !VALID_FIELDS.includes(field));
  if (invalidFields.length > 0) {
    return next(new AppError([`Invalid fields: ${invalidFields.join(', ')}`], StatusCodes.BAD_REQUEST));
  }
  next();
}

module.exports = { validateCreateExample, validateUpdateExample };
