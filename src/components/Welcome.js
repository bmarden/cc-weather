import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Welcome = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="display-4 text-white-50">Welcome to CC Weather</div>
          <p className="text-white-50">
            The goal of CC Weather is to provide accurate weather forecasts
            while also showing a glimpse into the past to look at how Climate
            Change may be affecting weather patterns near you.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
