import * as React from 'react';
import { Card, CardHeader } from 'reactstrap';
import Grid from './grid';
import ControlPanel from './control-panel';
import ModalWindow from './modal-window';
import { ModalMapNew } from './modal-map-new';

export default class Main extends React.PureComponent {
  render() {
    const { actions, clientProps, rows, toggleModal } = this.props;

    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <h5>Текущие заказы</h5>
          </CardHeader>
          
          <Grid rows={rows} />
          <ControlPanel toggleModal={toggleModal} />
          <ModalWindow
            actions={actions}
            clientProps={clientProps}
          />


          <ModalMapNew
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}

            isMarkerShown
          />

        </Card>
      </React.Fragment>
    );
  }
}
