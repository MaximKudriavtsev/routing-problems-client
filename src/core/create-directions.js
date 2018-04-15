import { KEY } from './constants';

function sleep(ms) {
  ms += new Date().getTime();
  while (new Date() < ms) { }
}

const getDirectionPromise = (origin, destination) => {
  return fetch(
    `https://maps.googleapis.com/maps/api/directions/json?&origin=${origin}&destination=${destination}&key=${KEY}`, {
      mode: 'cors',
      method: 'GET',
      headers: { 'Access-Control-Allow-Origin': 'https://maps.googleapis.com' },
    });
};

const getPromiseArray = (directionsPromise) => {
  const directions = [];
  for (let i = 0; i < directionsPromise.length; i += 1) {
    directions[i] = Promise.all(directionsPromise[i]);
  }
  return directions;
};

// INPUT: new customers & old directions
export const getDirectionsPromise = (customers, directions) => {
  const newDirections = directions.slice();
  const oldLength = directions.length;

  while (newDirections.length < customers.length) {
    newDirections.push([]);
  }

  for (let i = 0; i < newDirections.length; i += 1) {
    for (let j = 0; j < newDirections.length; j += 1) {
      // middle line and under the middle line
      if (i >= j) {
        newDirections[i][j] = 0;
        continue;
      }
      // get direction from google api
      newDirections[i][j] = getDirectionPromise(customers[i], customers[j]);
    }
  }
  const directionsPromiseArray = getPromiseArray(newDirections);
  const directionsPromise = Promise.all(directionsPromiseArray);

  return directionsPromise;
};

export const getDirectionsResponse = (responseDirectionsMatrix) => {
  const jsonDirectionsMatrix = [];
  for (let i = 0; i < responseDirectionsMatrix.length; i += 1) {
    jsonDirectionsMatrix.push([]);
  }

  for (let i = 0; i < responseDirectionsMatrix.length; i += 1) {
    for (let j = 0; j < responseDirectionsMatrix.length; j += 1) {
      if (typeof (responseDirectionsMatrix[i][j]) === 'number') {
        jsonDirectionsMatrix[i][j] = responseDirectionsMatrix[i][j];
        continue;
      }

      jsonDirectionsMatrix[i][j] = responseDirectionsMatrix[i][j].json();
    }
  }
  const promiseArray = getPromiseArray(jsonDirectionsMatrix);
  const directionsResponse = Promise.all(promiseArray);

  return directionsResponse;
};

export const validateDirectionMatrix = (directionMatrix) => {
  const length = directionMatrix.length;
  const nextDirectionMatrix = [];

  for (let i = 0; i < length; i += 1) {
    nextDirectionMatrix.push([]);
    for (let j = 0; j < length; j += 1) {
      if (typeof (directionMatrix[i][j]) === 'number') {
        nextDirectionMatrix[i][j] = directionMatrix[i][j];
        continue;
      }
      nextDirectionMatrix[i][j] = directionMatrix[i][j].routes[0].legs[0].distance.value;
    }
  }

  return nextDirectionMatrix;
};