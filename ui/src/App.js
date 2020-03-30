/* eslint-disable class-methods-use-this */
import React, {
  Component,
} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout';

import DashboardService from './components/dashboard/Main';
import MeasurementsService from './components/measurements/Main';
import ActivityService from './components/activity/Main';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          {/* <Route path="/services/hashtag-analysis">
            <OtherService />
          </Route> */}
          <Route path="/services/measurements">
            <MeasurementsService />
          </Route>
          <Route path="/services/activity">
            <ActivityService />
          </Route>
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