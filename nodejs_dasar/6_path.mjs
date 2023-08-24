import path from "path";

const filename = '/opt/lampp/htdocs/codelabs/pzn/node/dasar/6_path.mjs';
console.info(path.sep);
console.info(path.dirname(filename));
console.info(path.basename(filename));
console.info(path.extname(filename));
console.info(path.parse(filename));