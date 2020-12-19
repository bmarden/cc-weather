import React from 'react';
import { Card, Container } from 'react-bootstrap';

const About = () => {
  return (
    <Container>
      <Card>
        <Card.Body>
          <p>
            Welcome to CC-Weather. The intent of this project is to provide an easy to use
            interface to check the current and forecasted weather across the continental
            United States while also providing access to historical data.
          </p>
          <p>
            Most weather applications don&apos;t offer any type of historical data or
            analysis, and if they do, it isn&apos;t the most intuitive experience. My goal
            for this site was to bring that functionality to the forefront in the hopes
            that people will get more curious about historical weather trends in their
            area.
          </p>
          <p>
            The absolute end goal (not even close to being there yet) is to have a website
            that shows historical data, extreme weather events, and analysis on climate
            change to hopefully educate people on how our climate is changing.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
