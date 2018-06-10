import {
  getDirectionsPromise,
  getDirectionsResponse,
  validateDirectionMatrix
} from './../core/create-directions';
import {
  getMinimalChainConditions,
  getPointIndex
} from './../core/create-route';

const KEY = 'AIzaSyAGaF4cA3wqi33FzmapotsZFDErzY8wFmE';
const MAX_WEIGHT = 1500;
const MAX_VOLUME = 9;

export const setVolume = (volume) => {
  return ({
    payload: volume,
    type: 'SET_VOLUME'
  });
};

export const setWeight = (weight) => {
  return ({
    payload: weight,
    type: 'SET_WEIGHT'
  });
};

export const setLat = (lat) => {
  return ({
    payload: lat,
      type: 'SET_LAT'
  });
};

export const setLng = (lng) => {
  return ({
    payload: lng,
    type: 'SET_LNG'
  });
};

export const setFrom = (from) => {
  return ({
    payload: from,
    type: 'SET_FROM'
  });
};

export const setTo = (to) => {
  return ({
    payload: to,
    type: 'SET_TO'
  });
};

export const toggleModal = () => {
  return ({
    type: 'TOGGLE_MODAL'
  });
};

export const addRow = (row, directions, customers, volumes, weights) => (dispatch) => {
  const newCustomers = customers.slice();
  const newDirections = directions.slice();
  const newVolumes = volumes.slice();
  const newWeights = weights.slice();

  newCustomers.push(row.from);
  newCustomers.push(row.to);
  newVolumes.push(row.volume);
  newWeights.push(row.weight);

  const directionsPromise = getDirectionsPromise(newCustomers, newDirections);

  directionsPromise.then((values) => {
    const jsonDirections = getDirectionsResponse(values);
    jsonDirections.then((matrix) => {
      const nextDirections = validateDirectionMatrix(matrix);
      console.log(nextDirections);

      dispatch({
        payload: {
          directions: nextDirections
        },
        type: 'RESPONSE_DIRECTIONS'
      });
    });
  });

  dispatch({
    payload: {
      customers: newCustomers,
      weights: newWeights,
      volumes: newVolumes,
      row,
      loading: true,
    },
    type: 'ADD_ROW'
  });
};

export const addRow1 = (row) => {
  fetch(
    'https://maps.googleapis.com/maps/api/directions/json?&origin=55.7558,37.6173&destination=54.2048,37.6185&key=AIzaSyAGaF4cA3wqi33FzmapotsZFDErzY8wFmE',
    {
      mode: 'cors',
      method: 'GET',
      headers: { 'Access-Control-Allow-Origin': 'https://maps.googleapis.com' },
    },
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((result) => {
      console.log(result);
      return console.log(result);
    })
    .catch(alert);


  return ({
    payload: row,
    type: 'ADD_ROW'
  });
};

export const postData = (text) => (dispatch) => {
  const fetchTask = fetch('/api/AddPoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(text)
  }).then(val => {
    console.log(val);
    return val.json();
  }).then(value => {
    dispatch({ type: 'RESPONSE', payload: value });
  }).catch(err => {
    console.log(err);
    dispatch({ type: 'ERROR' });
  });
  dispatch({ type: 'LOADING' });
};

export const getMinimalChain = (directions, customers, weights, volumes) => {
  const minimalChain = getMinimalChainConditions(directions, weights, volumes, MAX_WEIGHT, MAX_VOLUME);
  const pointPairs = [];

  minimalChain.chain.forEach((point) => {
    const customer = customers[getPointIndex(point)]
    pointPairs.push(customer);
  });

  return({
    type: 'GET_MINIMAL_CHAIN',
    payload: {
      minimalChain,
      pointPairs
    }
  });
};