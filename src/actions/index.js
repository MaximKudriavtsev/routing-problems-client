import { createDirections } from './../../core/create-directions';

const KEY = 'AIzaSyAGaF4cA3wqi33FzmapotsZFDErzY8wFmE';

export const setVolume = (volume) => {
  return ({
    payload: volume,
    type: 'SET_VOLUME'
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

export const addRow = (row, directions, customers) => {
  const newCustomers = customers.slice();
  const newDirections = directions.slice();

  newCustomers.push(row.from);
  newCustomers.push(row.to);

  debugger
  const nextDirections = createDirections(customers, newDirections);

  return({
    payload: {
      customers: newCustomers,
      row,
    },
    type: 'ADD_ROW'
  });
});


export const addRow1 = (row, directions, customers) => {
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
      debugger;
      return response.json();
    })
    .then((result) => {
      console.log(result);
      debugger
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