import Mustache from 'mustache';

test('test mustache', () => {
  const data = Mustache.render('Hello, {{name}}',{name: 'Hidayat'});
  expect(data).toBe('Hello, Hidayat');
});

test('test mustache cache', () => {
  Mustache.parse('Hello, {{name}}');
  const data = Mustache.render('Hello, {{name}}',{name: 'Hidayat'});
  expect(data).toBe('Hello, Hidayat');
});

test('test mustache tag', () => {
  const data = Mustache.render('Hello, {{name}}, my hobby is {{{hobby}}}',{name: 'Hidayat', hobby: '<b>Programming</b>'});
  expect(data).toBe('Hello, Hidayat, my hobby is <b>Programming</b>');
});

test('test mustache nested object', () => {
  const data = Mustache.render('Hello, {{person.name}}',{
    person: {
      name: 'Hidayat'
    }
  });
  expect(data).toBe('Hello, Hidayat');
});