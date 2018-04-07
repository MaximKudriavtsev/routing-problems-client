import * as React from 'react';
import Header from './header/header';
import Main from './main/main';
import Result from './result/result';
import Footer from './footer/footer';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Main />
        {/* <Result /> */}
        <Footer />
      </ React.Fragment>
    );
  }
}
