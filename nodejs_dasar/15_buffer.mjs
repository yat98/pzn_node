const buffer = Buffer.from('Hidayat Chandra');
console.info(buffer);
console.info(buffer.toString());

buffer.reverse();

console.info(buffer.toString());
console.info(buffer.toString('base64'));
console.info(buffer.toString('hex'));

const bufferBase64 = Buffer.from('SGlkYXlhdCBDaGFuZHJh','base64');
console.info(bufferBase64.toString('utf8'));