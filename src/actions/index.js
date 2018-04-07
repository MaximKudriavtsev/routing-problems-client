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

export const addRow = (row) => (dispatch) => {
  const fetchTask = fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyBOJw2cBN7I7GvH1lD17TO9-C5eOQ_Nb4s', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  }).then(val => {
    console.log(val);
    return val.json();
  }).then(value => {
    console.log(value);
        // dispatch({ type: 'RESPONSE', payload: value });
  }).catch(err => {
    console.log(err);
    dispatch({ type: 'ERROR' });
  });
  dispatch({ type: 'LOADING' });

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