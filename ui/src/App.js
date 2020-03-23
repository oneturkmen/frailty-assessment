/* eslint-disable class-methods-use-this */
import React, {
  Component,
} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header, Footer, Sidebar } from './components/layout';

import DashboardService from './components/dashboard/Main';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          {/* <Route path="/services/hashtag-analysis">
            <OtherService />
          </Route> */}
          <Route path="/">
            <DashboardService />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;