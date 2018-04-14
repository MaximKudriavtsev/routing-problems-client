const KEY = 'AIzaSyAGaF4cA3wqi33FzmapotsZFDErzY8wFmE';
const DIRECTION_URL = 'https://maps.googleapis.com/maps/api/directions/json?&origin=55.7558,37.6173&destination=54.2048,37.6185&key=AIzaSyAGaF4cA3wqi33FzmapotsZFDErzY8wFmE'

export const getDirectionPromise = (origin, destination) => {
  return fetch(
  `https://maps.googleapis.com/maps/api/directions/json?&origin=${origin}&destination=${destination}&key=${KEY}`, {
    mode: 'cors',
    method: 'GET',
    headers: { 'Access-Control-Allow-Origin': 'https://maps.googleapis.com' },
  });
};

export const getDirections = (directionsPromise) => {
  const directions = [];
  for (let i = 0; i < directionsPromise.length; i += 1) {
    directions[i] = Promise.all(directionsPromise[i]);
  }

  return directions;
};

// INPUT: new customers & old directions
export const createDirections = (customers, directions) => {
  const newDirections = directions.slice();
  const oldLength = directions.length;

  while (newDirections.length < customers.length) {
    newDirections.push([]);
  }

  for (let i = 0; i < newDirections.length; i += 1) {
    for (let j = oldLength; j < newDirections.length; j += 1 ) {
      // middle line and under the middle line
      if (i >= j) {
        newDirections[i][j] = 0;
        continue;
      }
      // get direction from google api
      newDirections[i][j] = getDirectionPromise(customers[i], customers[j]);
    }
  }

  const directionsPromiseArray = getDirections(newDirections);

  const directionsPromise = Promise.all(directionsPromiseArray);

  return directionsPromise;
};

export const responseJsonDirections = (responseDirections) => {
  const jsonPromiseDirections = [];
  for (let i = 0; i < responseDirections.length; i += 1) {
    jsonPromiseDirections.push([]);
  }

  for (let i = 0; i < responseDirections.length; i += 1) {
    for (let j = i; j < responseDirections.length; j += 1 ) {
      if (typeof(responseDirections[i][j]) === 'number') {
        jsonPromiseDirections[i][j] = responseDirections[i][j];
        continue;
      }

      jsonPromiseDirections[i][j] = responseDirections[i][j].json();
    }
  }

  const nextDirections = getDirections(jsonPromiseDirections);
  const jsonDirections = Promise.all(nextDirections);

  return jsonDirections;
};

export const validateDirectionMatrix = (directionMatrix) => {
  const length = directionMatrix.length;
  const nextDirectionMatrix = [];

  for (let i = 0; i < length; i += 1) {
    nextDirectionMatrix.push([]);
    for (let j = i; j < length; j += 1 ) {
      if (typeof(directionMatrix[i][j]) === 'number') {
        nextDirectionMatrix[i][j] = directionMatrix[i][j];
        continue;
      }

      nextDirectionMatrix[i][j] = directionMatrix[i][j].routes[0].legs[0].distance.value;
    }
  }

  return nextDirectionMatrix;
};