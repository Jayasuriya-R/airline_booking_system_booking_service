const { StatusCodes } = require('http-status-codes');
const AppError = require('./app-error');

/**
 * Converts any error thrown by the repository layer into an AppError.
 * Used in the catch block of every service function.
 *
 *   catch (error) { throw toAppError(error, 'Airplane', 'create'); }
 */
function toAppError(error, resourceName, action) {
  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    return new AppError(error.errors.map((e) => e.message), StatusCodes.BAD_REQUEST);
  }
  if (error.statusCode === StatusCodes.NOT_FOUND) {
    return new AppError(`Requested ${resourceName} not found`, StatusCodes.NOT_FOUND);
  }
  return new AppError(
    `Cannot ${action} ${resourceName}`,
    StatusCodes.INTERNAL_SERVER_ERROR
  );
}

module.exports = toAppError;
