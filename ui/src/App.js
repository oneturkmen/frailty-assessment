/* eslint-disable class-methods-use-this */
import React, {
  Component, Fragment,
} from 'react';
import { Header, Footer } from './components/layout';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
