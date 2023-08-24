import winston from "winston";

test('create new logger level', () => {
  const logger = winston.createLogger({
    level: 'debug',
    transports: [
      new winston.transports.Console({}),
    ],
  });

  logger.log({
    level: 'error',
    message: 'Hello error'
  });

  logger.log({
    level: 'warn',
    message: 'Hello warn'
  });

  logger.log({
    level: 'info',
    message: 'Hello info'
  });

  logger.log({
    level: 'http',
    message: 'Hello http'
  });

  logger.log({
    level: 'verbose',
    message: 'Hello verbose'
  });

  logger.log({
    level: 'debug',
    message: 'Hello debug'
  });

  logger.log({
    level: 'silly',
    message: 'Hello silly'
  });

  logger.error('Hello error short');

  logger.warn('Hello warn short');

  logger.info('Hello info short');

  logger.http('Hello http short');

  logger.verbose('Hello verbose short');

  logger.debug('Hello debug short');

  logger.silly('Hello silly short');
})