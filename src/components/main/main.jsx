import * as React from 'react';
import { Card, CardHeader } from 'reactstrap';
import Grid from './grid';
import ControlPanel from './control-panel';
import ModalWindow from './modal-window';
import { SimpleMap } from './simple-map';

export default class Main extends React.PureComponent {
  render() {
    const { actions, clientProps, rows, toggleModal, getMinimalChain, directions } = this.props;

    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <h5>Текущие заказы</h5>
          </CardHeader>
          
          <Grid rows={rows} />
          <ControlPanel
            directions={directions}
            toggleModal={toggleModal}
            getMinimalChain={getMinimalChain}
            customers={clientProps.customers}
            volumes={clientProps.volumes}
            weights={clientProps.weights}
          />
          <ModalWindow
            actions={actions}
            clientProps={clientProps}
          />

        </Card>
      </React.Fragment>
    );
  }
}
