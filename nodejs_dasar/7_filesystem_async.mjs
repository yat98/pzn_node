import fs from 'fs/promises';

const buffer = await fs.readFile('7_filesystem.mjs');

console.log(buffer.toString());

await fs.writeFile('7_temp_async.txt', 'Hello World');
