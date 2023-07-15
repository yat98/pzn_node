import fs from 'fs';

const writter = fs.createWriteStream('16_target.log');

writter.write('Hidayat\n');
writter.write('Chandra');
writter.end();

const reader = fs.createReadStream('16_target.log');
reader.addListener('data', (data) => {
  console.info(data.toString());
});