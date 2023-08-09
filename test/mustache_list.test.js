import Mustache from 'mustache';
import fs from 'fs/promises';

test('test mustache list', async () => {
  const helloTemplate = await fs.readFile('./templates/hobbies.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate,{
    hobbies: [
      'Coding',
      'Photo',
      'Gaming',
      'Reading'
    ]
  });
  expect(data).toContain('Coding');
  expect(data).toContain('Photo');
  expect(data).toContain('Gaming');
  expect(data).toContain('Reading');
});

test('test mustache list object', async () => {
  const helloTemplate = await fs.readFile('./templates/students.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate,{
    students: [
      {name: 'John', value: 88},
      {name: 'James', value: 92},
      {name: 'Lia', value: 81},
    ]
  });
  expect(data).toContain('John');
  expect(data).toContain('88');
  expect(data).toContain('James');
  expect(data).toContain('92');
  expect(data).toContain('Lia');
  expect(data).toContain('81');
});