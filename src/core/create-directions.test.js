import {
  getDirectionsPromise,
} from './create-directions';

describe('Configure direction matrix', () => {
  const customers = ['0', '1', '-1'];
  const directions = [];
  window.fetch = jest.fn(() => Promise);

  it('create init directions', () => {
    const result = getDirectionsPromise(customers, directions);

    expect(result).toEqual([
      [0, Promise, Promise],
      [0, 0, Promise],
      [0, 0, 0],
    ]);
  });
});