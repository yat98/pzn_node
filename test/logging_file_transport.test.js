import winston from "winston";

test('create new logger file transport', () => {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({}),
      new winston.transports.File({
        filename: 'application.log'
      }),
      new winston.transports.File({
        filename: 'hidayat.log'
      })
    ],
  });

  logger.info('Hello format');
  logger.warn('Hello format');
  logger.error('Hello format');
});