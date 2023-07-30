import winston from "winston";

test('create new logger format', () => {
  const logger = winston.createLogger({
    level: 'info', 
    // format: winston.format.json(),
    // format: winston.format.simple(),
    // format: winston.format.logstash(),
    format: winston.format.printf(info => {
      return `${new Date()} : ${info.level.toUpperCase()} : ${info.message}`;
    }),
    transports: [
      new winston.transports.Console({}),
    ],
  });

  logger.info('Hello format');
  logger.warn('Hello format');
  logger.error('Hello format');
});