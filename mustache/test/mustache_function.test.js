import Mustache from 'mustache';
import fs from 'fs/promises';

test('test mustache function', () => {
  const parameter = {
    name: 'Yat',
    upper: () => {
      return (text, render) => {
        return render(text).toUpperCase();
      }
    }
  }

  const data = Mustache.render('Hello {{#upper}}{{name}}{{/upper}}',parameter);
  expect(data).toBe('Hello YAT');
});