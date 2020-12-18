import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Welcome = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="display-4 text-center text-white-50">Welcome to CC Weather</div>
          <p className="text-center text-white-50">
            The goal of CC Weather is to provide accurate weather forecasts while also
            providing an easy way to view historical data.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
