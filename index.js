const mongoose = require('mongoose');
const server = require('./src/server');
const { logger } = require('./src/utils');
const { PORT, DB_URI } = require('./config');

mongoose.connect(DB_URI, { useNewUrlParser: true });

async function initModels() {
  const NonLexicalModel = require('./src/features/complexity/nonLexical.model');
  await NonLexicalModel.checkAndSetDefaultValues();
}

initModels().then(() => console.log('Default data setup'));

const listener = server.listen(PORT, err => {
  if (err) {
    logger.error(err);
    throw err;
  }

  const { address, port } = listener.address();

  logger.info(`Server listening at http://${address}:${port}`);
});

const end = () => {
  process.stdout.write('\n');
  logger.info('Server stopped');
  process.exit(0);
};

const endWithError = () => {
  process.stdout.write('\n');
  logger.info('Server unexpected stopped');
  process.exit(1);
};

process.once('SIGTERM', endWithError);
process.once('SIGINT', end);

process.on('unhandledRejection', (err) => {
  logger.error('Possibly Unhandled Rejection happened:', err);
});

process.on('uncaughtException', (err) => {
  logger.error('Possibly uncaughtException happened:', err);
});
