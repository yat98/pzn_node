import {sumAll} from '../src/sum';

describe('when call sumAll()', () => {
  it('should get 30 with param [10,10,10]', () => {
    expect(sumAll([10,10,10])).toBe(30);
  });

  it('should get 50 with param [10,10,10,10,10]', () => {
    expect(sumAll([10,10,10,10,10])).toBe(50);
  });
});