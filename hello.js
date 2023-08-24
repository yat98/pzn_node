import {sayHello,sum} from 'yat98-belajar-nodejs-npm-library';
import {min, max} from 'yat98-belajar-nodejs-npm-library/number';

console.info(sayHello('Hidayat Chandra'));

const numbers = [10,10,10,10,10];
console.info(sum(numbers));

console.info(min(10,20));
console.info(max(10,20));