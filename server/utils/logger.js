'use strict';
/**
 * Require our modules
 */
const config = require('../../config/config');
const winston = require('winston');
const winstonLogger = require('winston-daily-rotate-file');
const fs = require('fs');

// Create the log directory if it does not exist before defining the logger
if (!fs.existsSync( config.logging.dir )) {
  fs.mkdirSync( config.logging.dir );
}

// Create Transport
const transport = new (winstonLogger)({
  filename: `${ config.logging.dir }/results.log`,
  level: config.logging.level,
  datePattern: config.logging.datePattern,
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d'
});

// Define the Logger
const logger = winston.createLogger({
  level: config.logging.level,
  transports: [
    transport,
    new winston.transports.Console()
  ]
});

// Export the module
module.exports = logger;