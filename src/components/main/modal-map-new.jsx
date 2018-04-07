import * as React from 'react';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class MyMapComponent extends React.PureComponent {
  render() {
    const props = this.props;
    return  (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
      </GoogleMap>
    );
  }
}

export const ModalMapNew = withScriptjs(withGoogleMap(MyMapComponent));

