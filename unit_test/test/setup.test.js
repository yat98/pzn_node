import {sum} from '../src/sum';

beforeAll(async () => {
  console.info('Before all');
});

afterAll(() => {
  console.info('After all');
});

beforeEach(() => {
  console.info('Before each');
});

test('first test', () => {
  expect(sum(1,2)).toBe(3);
  console.info('First test');
});

test('second test', () => {
  expect(sum(10,10)).toBe(20);
  console.info('Second test');
});

afterEach(async () => {
  console.info('After each');
})