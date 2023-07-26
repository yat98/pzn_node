import { sayHelloAsync } from "../src/async";

test('test async function', async () => {
  const result = await sayHelloAsync('Hidayat');
  expect(result).toBe('Hello Hidayat');
});

test('test async matchers', async () => {
  await expect(sayHelloAsync('Hidayat')).resolves.toBe('Hello Hidayat');
  await expect(sayHelloAsync(null)).rejects.toBe('Name is empty');
});