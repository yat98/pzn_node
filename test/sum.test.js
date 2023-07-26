import {sum} from '../src/sum';

test('test sum 1 & 2 must be 3', () => {
  const result = sum(1,2);

  expect(result).toBe(3)
});

test('test sum 2 & 3 must be 5', () => {
  const result = sum(2,3);

  expect(result).toBe(5)
});

test('test sum 1 & 1 must be 2', () => {
  const result = sum(1,1);

  expect(result).toBe(2)
});