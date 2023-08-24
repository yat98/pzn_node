import Mustache from 'mustache';
import fs from 'fs/promises';

test('test mustache section', async () => {
  const helloTemplate = await fs.readFile('./templates/person.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate,{
    person: {
      name: 'Hidayat'
    }
  });
  expect(data).toContain('Hello Person');
});

test('test mustache section not', async () => {
  const helloTemplate = await fs.readFile('./templates/person.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate,{});
  expect(data).not.toContain('Hello Person');
});

test('test mustache section data', async () => {
  const helloTemplate = await fs.readFile('./templates/person_data.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate,{
    person: {
      name: 'Hidayat'
    }
  });
  expect(data).toContain('Hello Person Hidayat!');
})

test('test mustache inverted section data', async () => {
  const helloTemplate = await fs.readFile('./templates/person_data.mustache')
    .then(data => data.toString());

  const data = Mustache.render(helloTemplate,{});
  expect(data).toContain('Hello Guest');
});