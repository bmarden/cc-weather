import React from 'react';
import './packages/weather-icons/css/weather-icons.min.css';
import { Accordion, Card, Button } from 'react-bootstrap';

const HourlyForecast = ({ hour }) => {
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {hour.temp}
            </Accordion.Toggle>
          </Card.Header>
        </Card>
      </Accordion>
    </div>
  );
};

export default HourlyForecast;
