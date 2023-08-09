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