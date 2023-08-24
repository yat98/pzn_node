import {sumAll} from '../src/sum';

const table = [
  [[], 0],
  [[10], 10],
  [[10,10,10], 30],
  [[10,10,10,10,10], 50],
  [[10,10,10,10,10,10,10], 70],
];

test.each(table)('test using array sumAll(%p) should result %i', (numbers, expected) => {
  expect(sumAll(numbers)).toBe(expected);
});

const tableObj = [
  {numbers: [], expected: 0},
  {numbers: [10], expected: 10},
  {numbers: [10,10,10], expected: 30},
  {numbers: [10,10,10,10,10], expected: 50},
  {numbers: [10,10,10,10,10,10,10], expected: 70},
];

test.each(tableObj)('test using object sumAll($numbers) should result $expected', ({numbers, expected}) => {
  expect(sumAll(numbers)).toBe(expected);
});