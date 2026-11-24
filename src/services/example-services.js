const { ExampleRepository } = require('../repositories');
const toAppError = require('../utils/errors/to-app-error');

const exampleRepository = new ExampleRepository();

async function createExample(data) {
  try {
    return await exampleRepository.create(data);
  } catch (error) {
    throw toAppError(error, 'Example', 'create');
  }
}

async function getAllExamples() {
  try {
    return await exampleRepository.getAll();
  } catch (error) {
    throw toAppError(error, 'Example', 'fetch');
  }
}

async function getExample(id) {
  try {
    return await exampleRepository.get(id);
  } catch (error) {
    throw toAppError(error, 'Example', 'fetch');
  }
}

async function updateExample(id, data) {
  try {
    return await exampleRepository.update(id, data);
  } catch (error) {
    throw toAppError(error, 'Example', 'update');
  }
}

async function deleteExample(id) {
  try {
    return await exampleRepository.destroy(id);
  } catch (error) {
    throw toAppError(error, 'Example', 'delete');
  }
}

module.exports = {
  createExample,
  getAllExamples,
  getExample,
  updateExample,
  deleteExample,
};
