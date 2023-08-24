function tagFunction(array, ...args) {
  console.info(array);
  console.info(args);
}

test('test function', () => {
  const name = 'Hidayat';
  const lastName = 'Chandra';

  tagFunction`Hello ${name} ${lastName}!, How are you?`
  tagFunction`Bye ${name} ${lastName}, see you later`
});

test('test function sql', () => {
  const name = "Hidayat'; DROP TABLE users;";
  const age = 30;

  tagFunction`SELECT * FROM users name = ${name} AND age = ${age}`;
});