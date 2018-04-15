const values = [
  [0, 1, 3, 3, 4],
  [1, 0, 1, 6, 7],
  [3, 1, 0, 8, 9],
  [3, 6, 8, 0, 10],
  [4, 7, 9, 10, 0],
];

const pointIndexes = {
  '0': 0,
  '1': 1,
  '-1': 2,
  '2': 3,
  '-2': 4,
};

export const getPointIndex = (point) => {
  if (point < 0) return -point * 2;
  if (point > 0) return point * 2 - 1;
  return 0;
};

export const getChainLength = (chain, directions) => {
  let length = 0;

  for (let index = 0; index < chain.length - 1; index += 1) {
    const currentElemIndex = getPointIndex(chain[index]);
    const nextElemIndex = getPointIndex(chain[index + 1]);

    if (currentElemIndex < nextElemIndex) {
      length += directions[currentElemIndex][nextElemIndex];
    } else {
      length += directions[nextElemIndex][currentElemIndex];
    }
  }
  return length;
};

export const isFinishChain = (availiablePoints, chain) => {
  if (chain[chain.length - 1] !== 0 || availiablePoints.length + 1 > chain.length) return false;
  const readedPoints = [];
  for (let index = 1; index < chain.length; index += 1) {
    const currentPoint = chain[index];
    if (currentPoint < 0) continue;
    if (readedPoints.findIndex(readedPoint => readedPoint === currentPoint) !== -1) continue;

    readedPoints.push(currentPoint);
    readedPoints.push(-currentPoint);
    for (let j = index + 1; j < chain.length; j += 1) {
      if (chain[j] === -currentPoint) {
        break;
      } else if (j === chain.length - 1) return false;
    }
  }

  return true;
};

export const minimalChain = (points, chain, minLength) => {
  const lastChainPoint = !!chain.length && chain[chain.length - 1];
  const availiablePoints = points.filter(point => point !== lastChainPoint);

  const currentChainLenght = getChainLength(chain);
  if (isFinishChain(points, chain)) {
    if (currentChainLenght < minLength) {
      minimalChain(points, [0], currentChainLenght);
    } return;
  }
  if (currentChainLenght >= minLength) {
    return;
  }
  availiablePoints.forEach((point) => {
    const nextChain = chain.slice();
    nextChain.push(point);
    minimalChain(points, nextChain, minLength);
  });
};

export const getMinimalChain = (points) => {
  let minimalChain = points.slice();
  minimalChain.push(0);
  let minimalLength = getChainLength(minimalChain);

  const minimalChain2 = (points, chain, minLength, availiablePoints) => {
    const currentChainLenght = getChainLength(chain);

    if (currentChainLenght > minLength) {
      console.log(chain);
      return;
    }

    if (isFinishChain(points, chain) && currentChainLenght < minLength) {
        minLength = currentChainLenght;
        minimalChain = chain;
        return;
    }

    availiablePoints.forEach((point) => {
      const nextChain = chain.slice();
      const nextAvailiablePoints = availiablePoints.map(availiablePoint => {
        if (point === availiablePoint) {
          if (point > 0) {
            return -point;
          } else return;
        }
        return availiablePoint;
      });
      if (nextAvailiablePoints[0] === undefined) nextAvailiablePoints[0] = 0; // problem place!

      nextChain.push(point);
      minimalChain2(points, nextChain, minLength, nextAvailiablePoints);
    });

    return;
  };

  const initialAvailiablePoints = points.filter(point => point > 0);
  minimalChain2(points, [0], minimalLength, initialAvailiablePoints);

  console.log({ chain: minimalChain, length: minimalLength });
  return { chain: minimalChain, length: minimalLength };
};

/* =================================== */


export const getAvailiablePoints = (point, availablePoints) => {
  const nextAvailiablePoints = [];

  for (let index = 0; index < availablePoints.length; index += 1) {
    const availablePoint = availablePoints[index];
    if (availablePoint === point) {
      if (point > 0) {
        nextAvailiablePoints.push(-availablePoint);
        continue;
      } else {
        continue;
      }
    }
    nextAvailiablePoints.push(availablePoint);
  }

  if (nextAvailiablePoints.length === 0) return [0];
  return nextAvailiablePoints;
};

export const getPoints = (directions) => {
  const points = [0];
  for (let index = 1; index < directions.length; index += 1) {
    if (index % 2 === 0) {
      points.push(index/-2);
    } else {
      points.push((index + 1) / 2);
    }
  }
  return points;
};


export const getMinimalChainConditions = (directions, weights, volumes, maxWeight, maxVolume) => {
  const points = getPoints(directions);
  let minimalChain = points.slice();
  minimalChain.push(0);
  let minimalLength = getChainLength(minimalChain, directions);

  
  const findMinimalChain = (chain, currentWeight, currentVolume, points, availablePoints) => {
    const currentChainLenght = getChainLength(chain, directions);

    if (currentChainLenght > minimalLength) {
      console.log(`${chain} ${currentChainLenght}`);
      return;
    }

    if (isFinishChain(points, chain) && currentChainLenght <= minimalLength) {
        minimalLength = currentChainLenght;
        minimalChain = chain;
        console.log(`min: ${chain} ${currentChainLenght}`);
        return;
    }

    availablePoints.forEach((point) => {
      const nextChain = chain.slice();
      const nextAvailablePoints = getAvailiablePoints(point, availablePoints);

      nextChain.push(point);
      findMinimalChain(nextChain, currentWeight, currentVolume, points, nextAvailablePoints);
    });

    return;
  };

  const initialAvailablePoints = points.filter(point => point > 0);
  findMinimalChain([0], 0, 0, points, initialAvailablePoints);

  console.log(`MIN: ${minimalChain} ${minimalLength}`);
  return { chain: minimalChain, length: minimalLength };
};