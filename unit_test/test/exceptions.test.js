import { MyException, callMe } from "../src/exceptions";

test('exception', () => {
  expect(() => callMe('Hidayat')).toThrow();
  expect(() => callMe('Hidayat')).toThrow(MyException);
  expect(() => callMe('Hidayat')).toThrow('Ups my exceptions happens');
});

test('exception', () => {
  expect(callMe('Andi')).toBe('OKE');
});