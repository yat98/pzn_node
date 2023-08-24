import Mustache from 'mustache';
import fs from 'fs/promises';

test('test mustache partial', async () => {
  const headerTemplate = await fs.readFile('./templates/header.mustache')
    .then(data => data.toString());
  const contentTemplate = await fs.readFile('./templates/content.mustache')
    .then(data => data.toString());
  const footerTemplate = await fs.readFile('./templates/footer.mustache')
    .then(data => data.toString());

  const data = Mustache.render(contentTemplate,{
    title: 'Hello Hidayat',
    content: 'Belajar NodeJS Mustache'
  },{
    header: headerTemplate,
    footer: footerTemplate,
  });

  console.info(data);

  expect(data).toContain('Hello Hidayat');
  expect(data).toContain('Belajar NodeJS Mustache');
  expect(data).toContain('Powered by PZN');
});