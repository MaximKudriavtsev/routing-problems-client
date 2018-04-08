import * as React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { MapDirection } from './map-direction';


export default class Result extends React.PureComponent {
  render() {
    const { resultPoints } = this.props;
    return (
          <Card style={{ marginTop: '20px' }}>
          <CardHeader>
            <h5>Маршрут</h5>
          </CardHeader>
          <CardBody>
            <MapDirection pointPairs={resultPoints} />
          </CardBody>
        </Card>
    );
  }
}