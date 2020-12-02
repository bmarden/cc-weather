import React from 'react';
import { Jumbotron, Form, Col } from 'react-bootstrap';
import GraphSelect from './GraphSelect';

const Historical = () => {
  return (
    <Jumbotron>
      <h3 className="text-center">Historical Weather</h3>
      <p>
        Use the below controls to choose what historical data you want to view.
        Data is initially loaded going back one year if available, but this can
        vary depending on the weather stations available.
      </p>
      <p>
        You can view a different weather station by using the stations dropdown.
        The tooltip for each station will show some information about the
        station including what dates that station has data for.
      </p>
      <Form>
        <Form.Row className="justify-content-sm-around">
          <Form.Group as={Col} xs={3}>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group as={Col} xs={3}>
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" placeholder="End Date"></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={3}>
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              className="mr-sm-2"
              id="inlineFormCustomSelect"
              custom
            >
              <option value="0">Choose...</option>
              <option value="Temperature">Temperature</option>
              <option value="Precipitation">Precipitation</option>
              <option value="3">Three</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </Form>
      <GraphSelect />
    </Jumbotron>
  );
};

export default Historical;
