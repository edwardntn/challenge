const winston = require('winston');

const {
  combine,
  timestamp,
  printf,
  colorize
} = winston.format;

const customLevels = {
  colors: {
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'blue',
    info: 'blue',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
  }
};
winston.addColors(customLevels.colors);
const myFormat = printf(info => `${info.timestamp} ${info.level}: ${info.message}`);

const logger = winston.createLogger({
  format: combine(
    colorize(),
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
});

logger.on('error', err => console.log('Logger error', err));

module.exports = logger;
