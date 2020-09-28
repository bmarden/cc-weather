import React, { useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';
import Axios from 'axios';
import './DailyForecast.css';
import 'weather-icons/css/weather-icons.min.css';
import 'weather-icons/css/weather-icons-wind.min.css';

const DailyForecast = ({ hourlyForecast }) => {
  const [curWeather, setCurWeather] = useState(null);

  useEffect(() => {
    const getCurWeather = async () => {
      const response = await Axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat: hourlyForecast.data.city.coord.lat,
            lon: hourlyForecast.data.city.coord.lon,
            units: 'imperial',
            appid: process.env.REACT_APP_OW_API_KEY,
          },
        }
      );
      setCurWeather(response.data);
    };

    if (hourlyForecast != null) {
      getCurWeather();
    }
  }, [hourlyForecast]);

  return (
    <Jumbotron>
      <h1>CC Weather</h1>
      {curWeather != null ? (
        <Media>
          <img
            width="100"
            height="100"
            src={`https://openweathermap.org/img/wn/${curWeather.weather[0].icon}@2x.png`}
            alt="Current condition"
          />
          <Media.Body>
            <h5>
              {curWeather.name} {curWeather.main.temp} &#176;
            </h5>
            <ul>
              <li>Feels like: {curWeather.main.feels_like}&#176;</li>
              <li>Conditions: {curWeather.weather[0].main}</li>
              <li>
                Wind:{' '}
                <i
                  className={`wi wi-wind towards-${curWeather.wind.deg}-deg`}
                  style={{ fontSize: '1.5em;' }}
                >
                  &nbsp;
                </i>
                {curWeather.wind.speed}
              </li>
            </ul>
          </Media.Body>
        </Media>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </Jumbotron>
  );
};

export default DailyForecast;
