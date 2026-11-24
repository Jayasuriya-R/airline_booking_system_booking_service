const app = require('./app');
const { serverConfig, logger } = require('./config');
const db = require('./models');

async function start() {
  try {
    await db.sequelize.authenticate();
    logger.info('Database connection established');
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error.message}`);
    process.exit(1);
  }

  app.listen(serverConfig.PORT, () => {
    logger.info(`App started on port: ${serverConfig.PORT}`);
  });
}

start();
