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

// values shape is [0, 10, 20, 30];
export const getChainValue = (chain, values) => {
  let width = 0;

  for (let index = 0; index < chain.length; index += 1) {
    const currentPoint = chain[index];
    if (currentPoint > 0) {
      width += values[currentPoint];
    } else {
      width -= values[-currentPoint];
    }
  }
  return width;
};

export const getPointIndex = (point) => {
  if (point < 0) return -point * 2;
  if (point > 0) return point * 2 - 1;
  return 0;
};

export const getMinimalChainConditions = (directions, weights, volumes, maxWeight, maxVolume) => {
  const points = getPoints(directions);
  const initialAvailablePoints = points.filter(point => point > 0);
  let minimalChain = points.slice();
  minimalChain.push(0);
  let minimalLength = getChainLength(minimalChain, directions);

  const findMinimalChain = (chain, availablePoints) => {
    const currentWeight = getChainValue(chain, weights);
    const currentVolume = getChainValue(chain, volumes);
    const currentLenght = getChainLength(chain, directions);
    
    if (currentLenght > minimalLength
      || currentVolume > maxVolume
      || currentWeight > maxWeight
    ) {
      console.log(`${chain} ${currentLenght}`);
      return;
    }

    if (isFinishChain(points, chain) && currentLenght <= minimalLength) {
        minimalLength = currentLenght;
        minimalChain = chain;
        console.log(`min: ${chain} ${currentLenght}`);
        return;
    }

    availablePoints.forEach((point) => {
      const nextChain = chain.slice();
      const nextAvailablePoints = getAvailiablePoints(point, availablePoints);

      nextChain.push(point);
      findMinimalChain(nextChain, nextAvailablePoints);
    });
    return;
  };

  findMinimalChain([0], initialAvailablePoints);

  console.log(`MIN: ${minimalChain} ${minimalLength}`);
  return { chain: minimalChain, length: minimalLength };
};