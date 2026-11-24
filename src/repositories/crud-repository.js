const { StatusCodes } = require('http-status-codes');
const { logger } = require('../config');
const AppError = require('../utils/errors/app-error');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      logger.error('Something went wrong in the Crud Repo:create');
      throw error;
    }
  }

  async destroy(id) {
    try {
      const response = await this.model.destroy({ where: { id } });
      if (!response) {
        throw new AppError('Requested resource not found', StatusCodes.NOT_FOUND);
      }
      return response;
    } catch (error) {
      logger.error('Something went wrong in the Crud Repo:destroy');
      throw error;
    }
  }

  async get(id) {
    try {
      const response = await this.model.findByPk(id);
      if (!response) {
        throw new AppError('Requested resource not found', StatusCodes.NOT_FOUND);
      }
      return response;
    } catch (error) {
      logger.error('Something went wrong in the Crud Repo:get');
      throw error;
    }
  }

  async getAll(options = {}) {
    try {
      return await this.model.findAll(options);
    } catch (error) {
      logger.error('Something went wrong in the Crud Repo:getAll');
      throw error;
    }
  }

  // Loads the row first so "update with identical values" isn't mistaken for "not found"
  // (MySQL reports 0 affected rows when nothing actually changed).
  async update(id, data) {
    try {
      const record = await this.model.findByPk(id);
      if (!record) {
        throw new AppError('Requested resource not found', StatusCodes.NOT_FOUND);
      }
      return await record.update(data);
    } catch (error) {
      logger.error('Something went wrong in the Crud Repo:update');
      throw error;
    }
  }
}

module.exports = CrudRepository;
