import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CurWeather from './components/currentWx/CurWeather';
import Navigation from './app/Navigation';
import HourlyForecast from './components/hourlyWx/HourlyForecast';
import Historical from './components/historicalWx/Historical';
import Footer from './app/Footer';
import Search from './components/search/Search';
import About from './components/About';
import Welcome from './components/Welcome';

import './App.css';

const App = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Navigation />
          <Container fluid="lg">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <>
                    <Search />
                    <Welcome />
                    <CurWeather />
                    <Historical />
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
