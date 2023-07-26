import {sum} from '../src/sum';

test('test sum(2,3) must be 3', () => {
  const result = sum(2,3);

  expect(result).toBe(3)
});