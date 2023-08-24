import zlib from 'zlib';
import fs from 'fs';

const source = fs.readFileSync('21_zlib.mjs');
const result = zlib.gzipSync(source);

fs.writeFileSync('21_zlib.mjs.txt',result);

const sourceCompress = fs.readFileSync('21_zlib.mjs.txt');
const resultDecompress = zlib.unzipSync(sourceCompress);
console.info(resultDecompress.toString());
