import * as React from 'react';
import _ from 'lodash';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

class MapComponent extends React.PureComponent {
  componentWillMount() {
    const refs = {}

    this.setState({
      bounds: null,
      center: {
        lat: 41.9, lng: -87.624
      },
      markers: [],
      onMapMounted: ref => {
        refs.map = ref;
      },
      onBoundsChanged: () => {
        this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter(),
        })
      },
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();
        /* eslint-disable-next-line no-undef */
        const bounds = new google.maps.LatLngBounds();

        places.forEach(place => {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        });
        const nextMarkers = places.map(place => ({
          position: place.geometry.location,
        }));
        const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

        this.setState({
          center: nextCenter,
          markers: nextMarkers,
        });
        // refs.map.fitBounds(bounds);
      },
    });
  }

  render() {
    const props = this.props;
    const {
      center,
      bounds,
      markers,
      onMapMounted,
      onBoundsChanged,
      onSearchBoxMounted,
      onPlacesChanged,
    } = this.state;

    return (
      <GoogleMap
        ref={onMapMounted}
        defaultZoom={15}
        center={center}
        onBoundsChanged={onBoundsChanged}
      >
        
        <SearchBox
          ref={onSearchBoxMounted}
          bounds={bounds}
          /* eslint-disable-next-line no-undef */
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder={props.from ? "Введите адрес отправления" : "Введите адрес доставки"}
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </SearchBox>

        {markers && markers.map((marker, index) => {
          const lng = marker.position.lng().toString();
          const lat = marker.position.lat().toString();
          props.setData(`${lat},${lng}`);
          console.log(`${lat},${lng}`);

          return <Marker key={index} position={marker.position} />
        }
        )}
      </GoogleMap>
    );
  }
}
const MapWithGoogle = withGoogleMap(MapComponent);

export const MapWithSearch = props => (
  <MapWithGoogle 
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    {...props}
  />
);
