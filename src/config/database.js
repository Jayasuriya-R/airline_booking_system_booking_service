// Used by BOTH sequelize-cli (via .sequelizerc) and src/models/index.js.
// All credentials come from .env, so this file is safe to commit.
require('dotenv').config();

const base = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  logging: false,
};

module.exports = {
  development: { ...base, logging: console.log },
  test: { ...base, database: `${process.env.DB_NAME}_test` },
  production: { ...base },
};
