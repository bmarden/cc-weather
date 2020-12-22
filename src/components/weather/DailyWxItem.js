import React from 'react';
import { Card, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { format, fromUnixTime } from 'date-fns';

import { iconMap } from '../../common/utils';

const DailyWxItem = ({ dailyWx }) => {
  return (
    <Col>
      <Card>
        <Card.Header className="text-center">
          {format(fromUnixTime(new Date(dailyWx.dt)), 'cccc')}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="d-flex justify-content-center pb-5">
              <OverlayTrigger overlay={<Tooltip>{dailyWx.weather[0].main}</Tooltip>}>
                <i className={`icon-cw-large wi ${iconMap[dailyWx.weather[0].icon]}`} />
              </OverlayTrigger>
            </Col>
          </Row>
          <Row className="pb-2">
            <Col>
              <OverlayTrigger overlay={<Tooltip>Temperature</Tooltip>}>
                <i className="wi wi-thermometer icon-hw-attr"></i>
              </OverlayTrigger>
              <span className="hf-val" style={{ color: '#d30402' }}>
                High: {Math.round(dailyWx.temp.max)}&#176;F&nbsp;
              </span>
              <span className="hf-val" style={{ color: '#0000ca' }}>
                Low: {Math.round(dailyWx.temp.min)}&#176;F
              </span>
            </Col>
          </Row>
          <Row className="pb-2">
            <Col>
              <OverlayTrigger overlay={<Tooltip>Precipitation chance</Tooltip>}>
                <i className="wi wi-raindrops icon-hw-attr"></i>
              </OverlayTrigger>
              <span className="hf-val">{Math.round(dailyWx.pop * 100)}%</span>
            </Col>
            <Col>
              <OverlayTrigger overlay={<Tooltip>UV Index</Tooltip>}>
                <i className="wi wi-hot icon-hw-attr"></i>
              </OverlayTrigger>
              <span className="hf-val">{dailyWx.uvi.toFixed(1)}</span>
            </Col>
          </Row>
          <Row className="pb-2">
            <Col>
              <OverlayTrigger overlay={<Tooltip>Wind Direction</Tooltip>}>
                <i className={`icon-hw-attr wi wi-wind from-${dailyWx.wind_deg}-deg`}></i>
              </OverlayTrigger>
              <span className="hf-val">{dailyWx.wind_deg}</span>
            </Col>
            <Col>
              <OverlayTrigger overlay={<Tooltip>Wind Speed</Tooltip>}>
                <i className="icon-hw-attr wi wi-strong-wind"></i>
              </OverlayTrigger>
              <span className="hf-val">{dailyWx.wind_speed}</span>
            </Col>
          </Row>
          <Row className="pb-2">
            <Col>
              <OverlayTrigger overlay={<Tooltip>Humidity</Tooltip>}>
                <i className="wi wi-humidity icon-hw-attr"></i>
              </OverlayTrigger>
              <span>{dailyWx.humidity}%</span>
            </Col>
            <Col>
              <OverlayTrigger overlay={<Tooltip>Dew Point</Tooltip>}>
                <i className="wi wi-raindrop icon-hw-attr"></i>
              </OverlayTrigger>
              <span>{dailyWx.dew_point}&#176;</span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

DailyWxItem.propTypes = {
  dailyWx: PropTypes.object,
};

export default DailyWxItem;
