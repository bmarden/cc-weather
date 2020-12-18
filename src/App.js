import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navigation from './app/Navigation';
import HourlyForecast from './components/weather/HourlyForecast';
import Historical from './components/historicalWx/Historical';
import Footer from './app/Footer';
import Search from './components/search/Search';
import About from './components/About';
import Home from './components/Home';

import './App.css';

const App = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Navigation />
          <Container fluid="lg">
            <Search />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <>
                    <Home />
                  </>
                )}
              />
              <Route exact path="/hourly-weather" component={HourlyForecast} />
              <Route exact path="/historical-weather" component={Historical} />
              <Route exact path="/about" component={About} />
            </Switch>
          </Container>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default App;
