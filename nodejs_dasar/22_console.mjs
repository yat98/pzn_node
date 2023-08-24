import {Console} from "console";
import fs from 'fs';

const logFile = fs.createWriteStream('22_application.log');

const log = new Console({
  stdout: logFile,
  stderr: logFile,
});

log.info('Hello World');
log.error('Ups!');

const person = {
  firstName: 'Hidayat',
  lastName: 'Chandra',
};
log.table(person);