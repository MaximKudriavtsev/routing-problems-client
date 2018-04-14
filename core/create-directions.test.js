import {
  getDirectionPromise,
  createDirections,
} from './create-directions';

describe('Configure direction matrix', () => {
  const customers = ['0', '1', '-1'];
  const directions = [];
  window.fetch = jest.fn(() => Promise);

  it('create init directions', () => {
    const result = createDirections(customers, directions);

    expect(result).toEqual([
      [0, Promise, Promise],
      [0, 0, Promise],
      [0, 0, 0],
    ]);
  });

  describe('#createDirections', () => {
    test('should work', () => {
      const origin = '55.7558,37.6173';
      const destination = '54.2048,37.6185';

      debugger
      const result = getDirectionPromise(origin, destination);
      expect(result).toBe(Promise);
    });
  });
});