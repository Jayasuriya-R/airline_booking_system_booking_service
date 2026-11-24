const CrudRepository = require('./crud-repository');
const { Example } = require('../models');

class ExampleRepository extends CrudRepository {
  constructor() {
    super(Example);
  }

  // Add model-specific queries here
}

module.exports = ExampleRepository;
