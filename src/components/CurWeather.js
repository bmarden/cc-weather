import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';
import Media from 'react-bootstrap/Media';
import './CurWeather.css';

const CurWeather = ({ weather }) => {
  return (
    <Jumbotron id="jumbo-weather">
      <h1>CC Weather</h1>
      <Media>
        <img
          width="100"
          height="100"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Current condition"
        />
        <Media.Body>
          <h5>
            {weather.name} {weather.main.temp} &#176;
          </h5>
          <ul>
            <li>Feels like: {weather.main.feels_like}&#176;</li>
            <li>Conditions: {weather.weather[0].main}</li>
            <li>
              Wind:{' '}
              <i
                className={`wi wi-wind towards-${weather.wind.deg}-deg`}
                style={{ fontSize: '1.5em' }}
              >
                &nbsp;
              </i>
              {weather.wind.speed}
            </li>
          </ul>
        </Media.Body>
      </Media>
    </Jumbotron>
  );
};

export default CurWeather;
