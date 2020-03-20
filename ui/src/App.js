/* eslint-disable class-methods-use-this */
import React, {
  Component, Fragment,
} from 'react';
import { Header, Footer } from './components/layout';
import TestServer from './components/core/TestServer.js';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <TestServer />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
