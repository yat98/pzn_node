import Mustache from 'mustache';
import fs from 'fs/promises';

test('test mustache', async () => {
  const commentTemplate = await fs.readFile('./templates/comment.mustache')
    .then(data => data.toString());

  const data = Mustache.render(commentTemplate,{title: 'Hello Hidayat'});
  expect(data).toContain('Hello Hidayat');
  expect(data).not.toContain('Ini komentar');
});