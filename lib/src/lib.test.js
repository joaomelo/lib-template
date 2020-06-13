import { Accumulator } from './lib.js';

describe('accumulator', () => {
  it('should start with zero in state', () => {
    const acc = new Accumulator();
    expect(acc.value()).toBe(0);
  });

  it('throw if not a number is passed to add', () => {
    const acc = new Accumulator();
    expect(() => acc.add('iAmNotANumber')).toThrow('not a number');
  });

  it('add should accumulate in the state', () => {
    const acc = new Accumulator();
    acc.add('5');
    acc.add(5);
    expect(acc.value()).toBe(10);
  });

  it('clear should move state to zero', () => {
    const acc = new Accumulator();
    acc.add('5');
    acc.add(5);
    acc.clear();
    expect(acc.value()).toBe(0);
  });
});
