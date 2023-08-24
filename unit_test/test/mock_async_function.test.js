import { getBalance } from "../src/async";

test('test mock async function', async () => {
  const from = jest.fn().mockResolvedValueOnce(1000);

  await expect(getBalance('Hidayat', from)).resolves
    .toEqual({name: 'Hidayat', balance: 1000});
  await expect(from.mock.calls.length).toBe(1);
  await expect(from.mock.results[0].value).resolves.toBe(1000);
});

test.failing('test mock async function fail', async () => {
  const from = jest.fn().mockRejectedValueOnce(new Error('Ups'));
  await getBalance('Hidayat',from);
});

test('test mock async function error matcher', async () => {
  const from = jest.fn().mockRejectedValueOnce('rejected');
  await expect(() => getBalance('Hidayat',from)).rejects.toBe('rejected');
});