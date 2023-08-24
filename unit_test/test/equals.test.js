test('test toBe', () => {
  const name = 'Hidayat';
  const hello = `Hello ${name}`;

  expect(hello).toBe('Hello Hidayat');
});

test('test toEquals', () => {
  let person = {id: 'hidayat'};
  Object.assign(person,{name:'Hidayat'});

  expect(person).toEqual({id: 'hidayat', name: 'Hidayat'});
});