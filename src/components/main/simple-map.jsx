import * as React from 'react';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps"

const Map = (props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>

export const SimpleMap = withGoogleMap(Map);