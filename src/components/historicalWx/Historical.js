import React, { useState } from 'react';
import { format, subMonths } from 'date-fns';
import { Jumbotron, Form, Col, Button, Row } from 'react-bootstrap';
import GraphSelect from './GraphSelect';

const Historical = () => {
  const [startDate, setStartDate] = useState(
    format(subMonths(new Date(), 12), 'yyyy-MM-dd')
  );
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [chartType, setChartType] = useState('');
  const [chartArgs, setChartArgs] = useState({
    startDate: startDate,
    endDate: endDate,
    chartType: 'Temperature',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setChartArgs({ startDate: startDate, endDate: endDate, chartType: chartType });
  };
  return (
    <Jumbotron>
      <h3 className="text-center">Historical Weather</h3>
      <p>
        Use the below controls to choose what historical data you want to view. Data is
        initially loaded going back one year if available, but this can vary depending on
        the weather station.
      </p>
      <p>
        You can view a different weather station using the Stations dropdown. The tooltip
        for each station will show some information about the station, including available
        dates.
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Row className="justify-content-sm-around">
          <Form.Group as={Col} xs={3}>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              placeholder="Start Date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={3}>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              min={startDate}
              max={format(new Date(), 'yyyy-MM-dd')}
              placeholder="End Date"
              onChange={(e) => setEndDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={3}>
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              className="mr-sm-2"
              onChange={(e) => setChartType(e.target.value)}
              custom
            >
              <option value="Temperature">Temperature</option>
              <option value="Precipitation">Precipitation</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Row>
          <Button
            type="submit"
            className="ml-auto mr-auto mb-3"
            variant="success"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Row>
      </Form>
      <GraphSelect chartArgs={chartArgs} />
    </Jumbotron>
  );
};

export default Historical;
