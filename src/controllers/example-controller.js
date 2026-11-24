const { StatusCodes } = require('http-status-codes');
const { ExampleService } = require('../services');
const { SuccessResponse } = require('../utils/common');

// POST /api/v1/examples
async function createExample(req, res) {
  const response = await ExampleService.createExample({
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
  });
  return res
    .status(StatusCodes.CREATED)
    .json(SuccessResponse('Successfully created the example', response));
}

// GET /api/v1/examples
async function getAllExamples(req, res) {
  const response = await ExampleService.getAllExamples();
  return res
    .status(StatusCodes.OK)
    .json(SuccessResponse('Successfully fetched all the examples', response));
}

// GET /api/v1/examples/:id
async function getExample(req, res) {
  const response = await ExampleService.getExample(req.params.id);
  return res
    .status(StatusCodes.OK)
    .json(SuccessResponse('Successfully fetched the example', response));
}

// PATCH /api/v1/examples/:id
async function updateExample(req, res) {
  const response = await ExampleService.updateExample(req.params.id, req.body);
  return res
    .status(StatusCodes.OK)
    .json(SuccessResponse('Successfully updated the example', response));
}

// DELETE /api/v1/examples/:id
async function deleteExample(req, res) {
  const response = await ExampleService.deleteExample(req.params.id);
  return res
    .status(StatusCodes.OK)
    .json(SuccessResponse('Successfully deleted the example', response));
}

module.exports = {
  createExample,
  getAllExamples,
  getExample,
  updateExample,
  deleteExample,
};
