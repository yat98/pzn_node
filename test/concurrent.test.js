import {sayHelloAsync} from '../src/async';

test.concurrent('concurrent 1', async () => {
  await expect(sayHelloAsync('Hidayat')).resolves.toBe('Hello Hidayat');
});

test.concurrent('concurrent 2', async () => {
  await expect(sayHelloAsync('Asep')).resolves.toBe('Hello Asep');
});

test.concurrent('concurrent 3', async () => {
  await expect(sayHelloAsync('Andi')).resolves.toBe('Hello Andi');
});