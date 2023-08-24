import util from 'util';

console.info(util.format('Nama : %s', 'Hidayat'));

const person = {
  firstName: 'Hidayat',
  lastName: 'Chandra',
};

console.info(util.format('Person : %j', person));