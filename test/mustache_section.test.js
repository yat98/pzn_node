import Mustache from 'mustache';
import fs from 'fs/promises';

test('test mustache file', async () => {
  const helloTemplate = await fs.readFile('./templates/person.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate,{
    person: {
      name: 'Hidayat'
    }
  });
  expect(data).toContain('Hello Person');
});

test('test mustache file not', async () => {
  const helloTemplate = await fs.readFile('./templates/person.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate,{});
  expect(data).not.toContain('Hello Person');
});