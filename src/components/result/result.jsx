import * as React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { MapDirection } from './map-direction';
import Direction from './direction';

export default class Result extends React.PureComponent {
  render() {
    const { resultPoints, rows, minimalChain } = this.props;
    return (
      <React.Fragment>
        <Card style={{ marginTop: '20px' }}>
          <CardHeader>
            <h5>Маршрут</h5>
          </CardHeader>
          <CardBody style={{ padding: 0 }} >
            <MapDirection pointPairs={resultPoints} />
          </CardBody>
        </Card>

        {minimalChain && <Card style={{ marginTop: '20px' }}>
          <CardHeader>
            <h5>Маршрутный лист</h5>
          </CardHeader>
          <CardBody>
            <Direction minimalChain={minimalChain} rows={rows} />
          </CardBody>
        </Card>}
      </React.Fragment>
    );
  }
}