import fs from 'fs';

const buffer = fs.readFileSync('6_path.mjs');

console.log(buffer.toString());

fs.writeFileSync('7_temp.txt', 'Hello World');