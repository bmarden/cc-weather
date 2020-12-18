import React from 'react';
import {
  Col,
  Accordion,
  Container,
  Row,
  Card,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { convertUnixTime, capitalizeFirstChar, iconMap } from '../../common/utils';
import PropTypes from 'prop-types';

const ForecastItem = ({ hourWx }) => {
  // Get data for the hour at hourWx

  return (
    <>
      <Card>
        <Accordion.Toggle as={Card.Header} variant="link" eventKey={hourWx.dt}>
          <Container>
            <Row>
              <Col>
                <i className={`icon-hw wi ${iconMap[hourWx.weather[0].icon]}`} />
                &nbsp; &nbsp;
                <span className="hf-title">{convertUnixTime(hourWx.dt)}</span>{' '}
              </Col>
              <Col className="text-left">
                <span className="hf-val">
                  {capitalizeFirstChar(hourWx.weather[0].description)}{' '}
                </span>
              </Col>
              <Col className="text-center">
                <OverlayTrigger overlay={<Tooltip>Temperature</Tooltip>}>
                  <i className="wi wi-thermometer icon-hw-attr"></i>
                </OverlayTrigger>
                <span className="hf-val">{Math.round(hourWx.temp)} &#176;F</span>
              </Col>
              <Col className="text-center">
                <OverlayTrigger overlay={<Tooltip>Precipitation chance</Tooltip>}>
                  <i className="wi wi-raindrops icon-hw-attr"></i>
                </OverlayTrigger>
                <span className="hf-val">{hourWx.pop} %</span>
              </Col>
              {/* <Col>
                <span className="hf-title">Feels like: </span>{' '}
                <span className="hf-val">{Math.round(hourWx.feels_like)} &#176;F </span> */}
              {/* </Col> */}
            </Row>
          </Container>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={hourWx.dt}>
          <Card.Body>
            <Container>
              <Row>
                <Col>
                  <OverlayTrigger overlay={<Tooltip>Cloud Cover</Tooltip>}>
                    <i className="wi wi-cloud icon-hw-attr"></i>
                  </OverlayTrigger>
                  <span>{hourWx.clouds} %</span>
                </Col>

                <Col>
                  <OverlayTrigger overlay={<Tooltip>Visibility</Tooltip>}>
                    <i className="wi wi-fog icon-hw-attr"></i>
                  </OverlayTrigger>
                  <span>{Math.round(hourWx.visibility / 1609)} Miles</span>
                </Col>
                <Col>
                  <OverlayTrigger overlay={<Tooltip>Humidity</Tooltip>}>
                    <i className="wi wi-humidity icon-hw-attr"></i>
                  </OverlayTrigger>
                  <span>{hourWx.humidity} %</span>
                </Col>
                <Col>
                  <OverlayTrigger overlay={<Tooltip>Dew Point</Tooltip>}>
                    <i className="wi wi-raindrop icon-hw-attr"></i>
                  </OverlayTrigger>
                  <span>{hourWx.dew_point} &#176;</span>
                </Col>
                <Col>
                  <OverlayTrigger overlay={<Tooltip>Pressure</Tooltip>}>
                    <i className="wi wi-barometer icon-hw-attr"></i>
                  </OverlayTrigger>
                  <span>{(hourWx.pressure / 33.86).toFixed(2)}</span>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
};

ForecastItem.propTypes = {
  hourWx: PropTypes.object,
};

export default ForecastItem;
