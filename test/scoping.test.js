beforeAll(() => console.info('Outer Before All'));
afterAll(() => console.info('Outer After All'));
beforeEach(() => console.info('Outer Before Each'));
afterEach(() => console.info('Outer After Each'));

test('test outer 1', () => console.info('Test Outer 1'));
test('test outer 2', () => console.info('Test Outer 2'));

describe('inner scope', () => {
  beforeAll(() => console.info('Inner Before All'));
  afterAll(() => console.info('Inner After All'));
  beforeEach(() => console.info('Inner Before Each'));
  afterEach(() => console.info('Inner After Each'));

  test('test inner 1', () => console.info('Test Inner 1'));
  test('test inner 2', () => console.info('Test Inner 2'));

  describe('inner inner scope', () => {
    beforeEach(() => console.info('Inner Before Each'));
    afterEach(() => console.info('Inner After Each'));

    test('test inner inner 1', () => console.info('Test Inner Inner 1'));
  });
});