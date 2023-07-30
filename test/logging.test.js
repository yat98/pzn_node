import winston from "winston";

test('create new logger', () => {
  const logger = winston.createLogger({});

  logger.log({
    level: 'log',
    message: 'Hello logger'
  });
});