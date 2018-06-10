import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as clientActions from '../actions/index';

import Header from '../components/header/header';
import Main from '../components/main/main';
import Result from '../components/result/result';
import Footer from '../components/footer/footer';

class App extends React.Component {
  render() {
    const { actions, clientProps } = this.props;

    return (
      <div className="container col-10">
        <Header />
        <Main
          actions={actions}
          clientProps={clientProps}
          rows={clientProps.rows}
          toggleModal={actions.toggleModal}
          getMinimalChain={actions.getMinimalChain}
          directions={clientProps.directions}
        />
        <Result
          resultPoints={clientProps.resultPoints}
          minimalChain={clientProps.minimalChain}
          rows={clientProps.rows}
        />
        <Footer />
      </ div>
    );
  }
}

export default connect(
  state => ({ clientProps: state }),
  dispatch => ({ actions: bindActionCreators(clientActions, dispatch) }),
)(App);
