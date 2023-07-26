test('array', () => {
  const names = ['Hidayat', 'Chandra'];
  expect(names).toContain('Hidayat');
  expect(names).toEqual(['Hidayat', 'Chandra']);

  const persons = [{name: 'hidayat'}, {name:'chandra'}];
  expect(persons).toContainEqual({name: 'chandra'});
  expect(persons).toEqual([{name: 'hidayat'}, {name:'chandra'}]);
});