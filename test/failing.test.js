import { sayHello } from "../src/sayHello";

test('sayHello success', () => {
  expect(sayHello('Hidayat')).toBe('Hello Hidayat');
});

test.failing('sayHello fail', () => {
  sayHello(null);
});

test('sayHello error matcher', () => {
  expect(() => sayHello()).toThrow();
});