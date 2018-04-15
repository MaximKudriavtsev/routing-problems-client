import {
  getChainLength,
  isFinishChain,
  getMinimalChain,
  getPoints,
  getAvailiablePoints
} from './create-route';

describe('Routing functions', () => {
  const points = [0, 1, 2, -1, -2];
  const directions = [
    [0, 1, 3, 3, 4],
    [0, 0, 1, 6, 7],
    [0, 0, 0, 8, 9],
    [0, 0, 0, 0, 10],
    [0, 0, 0, 0, 0],
  ];

  describe('#isFinishChain', () => {
    it('should work', () => {
      const result = isFinishChain(points, [0, 1, 2, -1, -2, 0]);
      expect(result).toBeTruthy();
    });
    it('should work with double', () => {
      const result = isFinishChain(points, [0, 1, -1, 2, -1, -2, -2, -1, 0]);
      expect(result).toBeTruthy();
    });
    it('should work with double', () => {
      const result = isFinishChain(points, [0, 1, -1, 2, -1, -2, -2, -1, 1, 2, 0]);
      expect(result).toBeTruthy();
    });
    it('should work with double', () => {
      const result = isFinishChain(points, [0, 1, -1, 2, -1, 0]);
      expect(result).toBeFalsy();
    });
    it('should work with double', () => {
      const result = isFinishChain(points, [0, -1, 1, -2, 2, 0]);
      expect(result).toBeFalsy();
    });
    it('should work with double', () => {
      const result = isFinishChain(points, [0, 1, 2, -1, 0]);
      expect(result).toBeFalsy();
    });
    it('should work with double', () => {
      const result = isFinishChain(points, [0, 2, -1, 0]);
      expect(result).toBeFalsy();
    });
  });

  describe('#getChainLength', () => {
    it('should work', () => {
      const result = getChainLength([0, 1, -1, 0], directions);
      expect(result).toEqual(5);
    });

    it('should work', () => {
      const result = getChainLength([0, 1, 0, -1], directions);
      expect(result).toEqual(5);
    });
  });

  describe('#getPoints', () => {
    it('should work with directions matrix', () => {
      const points = getPoints(directions);
      expect(points).toEqual([0, 1, -1, 2, -2]);
    });
  });

  describe('#getAvailiablePoints', () => {
    it('should change positive numbers', () => {
      const point = 1;
      const availiablePoints = [1, 2];

      expect(getAvailiablePoints(point, availiablePoints)).toEqual([-1, 2]);
    });

    it('should remove negative numbers', () => {
      const point = -2;
      const availiablePoints = [1, -2];

      expect(getAvailiablePoints(point, availiablePoints)).toEqual([1]);
    });

    it('should get zero if last element is negative', () => {
      const point = -2;
      const availiablePoints = [-2];

      expect(getAvailiablePoints(point, availiablePoints)).toEqual([0]);
    });

    it('should change last positive number', () => {
      const point = 1;
      const availiablePoints = [1];

      expect(getAvailiablePoints(point, availiablePoints)).toEqual([-1]);
    });
  });
});