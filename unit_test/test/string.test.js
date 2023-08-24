test('string', () => {
  const name = 'Hidayat Chandra';

  expect(name).toBe('Hidayat Chandra');
  expect(name).toEqual('Hidayat Chandra');
  expect(name).toMatch(/hand/);
});