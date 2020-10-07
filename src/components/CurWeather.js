import React from 'react';
import Media from 'react-bootstrap/Media';
import './packages/weather-icons/css/weather-icons.min.css';
import './packages/weather-icons/css/weather-icons-wind.min.css';
import './CurWeather.css';

const CurWeather = ({ weather }) => {
  return (
    <Media>
      <img
        width="120"
        height="120"
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Current condition"
      />
      <Media.Body>
        <h2>
          {weather.name} {Math.round(weather.main.temp)} &#176; F
        </h2>
        <ul>
          <li>Feels like: {Math.round(weather.main.feels_like)}&#176;F</li>
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
  );
};

export default CurWeather;
