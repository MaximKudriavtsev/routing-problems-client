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
      <React.Fragment>
        <Header />
        <Main
          actions={actions}
          clientProps={clientProps}
          rows={clientProps.rows}
          toggleModal={actions.toggleModal}
        />
        <Result resultPoints={clientProps.resultPoints} />
        <Footer />
      </ React.Fragment>
    );
  }
}

export default connect(
  state => ({ clientProps: state }),
  dispatch => ({ actions: bindActionCreators(clientActions, dispatch) }),
)(App);
