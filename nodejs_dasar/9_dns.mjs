import dns from 'dns/promises';

let address = await dns.lookup('www.dicoding.com');
console.info(address.address);
console.info(address.family);

address = await dns.lookup('www.programmerzamannow.com');
console.info(address.address);
console.info(address.family);