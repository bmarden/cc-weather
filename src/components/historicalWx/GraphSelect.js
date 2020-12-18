import React, { useEffect, useState } from 'react';
import {
  Card,
  Dropdown,
  Nav,
  NavItem,
  DropdownButton,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import startCase from 'lodash/fp/startCase';
import compose from 'lodash/fp/compose';
import toLower from 'lodash/fp/toLower';
import { fetchStationData, fetchHistTemp } from './histWxSlice';
import TempGraph from './TempGraph';
import PropTypes from 'prop-types';

const GraphSelect = ({ chartArgs }) => {
  const dispatch = useDispatch();
  const [stnIndex, setStnIndex] = useState(-1); // Initialize to -1 to control undefined reference on load
  const [interval, setInterval] = useState('daily');
  const search = useSelector((state) => state.search);
  const stations = useSelector((state) => state.histWx.stations);
  const stationsStatus = useSelector((state) => state.histWx.stationsStatus);

  // As soon as the search object from Places Autocomplete has a value, dispatch the API call
  // to get station data
  useEffect(() => {
    if (search.status === 'loaded') {
      dispatch(fetchStationData(search.place.bounds));
    }
  }, [search, dispatch]);

  /* Dispatch for historical data by day */
  useEffect(() => {
    if (stationsStatus === 'succeeded') {
      // Set station to the first in the list
      setStnIndex(0);
      let histParams = {
        sid: stations[0].sids[0],
        sdate: chartArgs.startDate,
        edate: chartArgs.endDate,
        elems: ['maxt', 'mint', 'avgt'],
        meta: [],
      };
      dispatch(fetchHistTemp(histParams));
    }
  }, [stationsStatus, stations, chartArgs.startDate, chartArgs.endDate, dispatch]);

  // Set station and call handleNavSelect to dispatch fetchHistTemp with correct date interval
  const handleStationSelect = (e) => {
    setStnIndex(e.target.value);
    handleChartUpdate(interval);
  };

  // Update the chart data when the user changes the station used or when they change the interval
  // between data points
  const handleChartUpdate = async (interval) => {
    // Update interval state
    setInterval(interval);
    // Build the params for API
    let histParams = {
      sid: stations[stnIndex].sids[0], // stnIndex will hold the most recent station selected by the user
      sdate: chartArgs.startDate, // From parent component
      edate: chartArgs.endDate, // From parent component
      meta: [],
    };
    // Set elems object based on selected interval
    if (interval === 'daily') {
      histParams.elems = ['maxt', 'mint', 'avgt'];
    } else if (interval === 'monthly') {
      histParams.elems = 'mly_max_maxt,mly_min_mint,mly_mean_avgt';
    }
    dispatch(fetchHistTemp(histParams));
  };

  // Display a tooltip on each station with details
  const renderStations = () => {
    if (stations) {
      const items = stations.map((stn, index) => (
        <OverlayTrigger
          key={stn.uid}
          placement="left"
          overlay={
            <Popover id="popover-basic">
              <Popover.Title as="h3">Station Data</Popover.Title>
              <Popover.Content>
                <strong>Date Range: </strong>
                {stn.valid_daterange[0][0]} - {stn.valid_daterange[0][1]}
                <br />
                <strong>Elevation:</strong> {stn.elev} feet
                <br />
                <strong>Lat/Lng:</strong> {stn.ll[1]}, {stn.ll[0]}
              </Popover.Content>
            </Popover>
          }
        >
          <Dropdown.Item
            as="button"
            key={stn.uid}
            value={index}
            onClick={handleStationSelect}
          >
            {compose(startCase, toLower)(stn.name)}
          </Dropdown.Item>
        </OverlayTrigger>
      ));
      return items;
    }
  };

  return (
    <Card>
      <Card.Header>
        <Nav variant="pills" defaultActiveKey="daily" onSelect={handleChartUpdate}>
          <Nav.Item>
            <Nav.Link eventKey="daily" href="#daily">
              By Day
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="monthly" href="#monthly">
              By Month
            </Nav.Link>
          </Nav.Item>
          <DropdownButton className="ml-auto" title="Stations" as={NavItem}>
            {renderStations()}
          </DropdownButton>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <strong>Weather Station:</strong>{' '}
          {stnIndex !== -1 ? compose(startCase, toLower)(stations[stnIndex].name) : ''}{' '}
        </Card.Title>
        <TempGraph />
      </Card.Body>
    </Card>
  );
};

GraphSelect.propTypes = {
  chartArgs: PropTypes.object,
};
export default GraphSelect;
