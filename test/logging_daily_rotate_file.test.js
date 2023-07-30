import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

test('create new logger file transport', () => {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({}),
      new DailyRotateFile({
        filename: 'app-%DATE%.log',
        zippedArchive: true,
        maxSize: '100m',
        maxFiles: '14d',
      }),
    ],
  });

  for(let i = 0; i< 100000; i++){
    logger.info(`Hello World ${i}`);
  }
});