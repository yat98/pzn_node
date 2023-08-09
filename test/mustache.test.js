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