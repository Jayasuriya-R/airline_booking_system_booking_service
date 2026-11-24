const { StatusCodes } = require('http-status-codes');
const { SuccessResponse } = require('../utils/common');

const info = (req, res) => {
  return res.status(StatusCodes.OK).json(SuccessResponse('Api is live'));
};

module.exports = { info };
