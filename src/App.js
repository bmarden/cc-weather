import React from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';

import CurWeather from './components/currentWx/CurWeather';
import Navigation from './app/Navigation';
import HourlyForecast from './components/hourlyWx/HourlyForecast';
import GraphSelect from './components/historicalWx/GraphSelect';
import Footer from './app/Footer';
import Search from './components/search/Search';
import About from './components/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
                    <CurWeather />
                    <GraphSelect />
                  </>
                )}
              />
              <Route exact path="/about" component={About} />
              <Jumbotron className="bg-t-dark" id="jumbo-weather">
                <Row>
                  <HourlyForecast />
                </Row>
              </Jumbotron>
            </Switch>
          </Container>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default App;
