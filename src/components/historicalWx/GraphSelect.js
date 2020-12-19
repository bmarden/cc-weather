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
import { fetchStationData, fetchHistData } from './histWxSlice';
import TempGraph from './TempGraph';
import PropTypes from 'prop-types';
import PrecipGraph from './PrecipGraph';

const GraphSelect = ({ chartArgs }) => {
  const dispatch = useDispatch();
  const [stnIndex, setStnIndex] = useState(0); // Initialize to -1 to control undefined reference on load
  const [interval, setInterval] = useState('daily');
  const search = useSelector((state) => state.search);
  const stations = useSelector((state) => state.histWx.stations);
  const stationsStatus = useSelector((state) => state.histWx.stationsStatus);

  // As soon as the search object from Places Autocomplete has a value, dispatch the API call
  // to get station data
  useEffect(() => {
    if (search.status === 'loaded') {
      let stationArgs = {
        bbox: search.place.bounds,
        meta: ['name', 'sids', 'uid', 'valid_daterange', 'll', 'elev', 'sid_dates'],
        sdate: '1970-01-01',
        edate: chartArgs.endDate,
      };

      // Based on chartType set in Historical component, query stations with the relevant data
      if (chartArgs.chartType === 'Temperature') {
        stationArgs.elems = ['maxt', 'mint', 'avgt'];
      } else if (chartArgs.chartType === 'Precipitation') {
        stationArgs.elems = ['pcpn'];
      }
      dispatch(fetchStationData(stationArgs));
    }
  }, [search, chartArgs.endDate, chartArgs.chartType, dispatch]);

  /* 
    Determines when to update the chart
    Will update under the following conditions:
    - Initial load or when chartArgs change - start/end date or chart type
    - Change in the interval - By Day / By Month
    - Change in the station selected
    Builds the chart arguments based upon currently active options  
  */
  useEffect(() => {
    // Only update if we have station data
    if (stationsStatus === 'succeeded') {
      let histArgs = {
        sid: stations[stnIndex].sids[0], // stnIndex will hold the most recent station selected by the user
        sdate: chartArgs.startDate, // From parent component
        edate: chartArgs.endDate, // From parent component
        meta: [],
      };
      // Set elems object based on selected interval
      if (interval === 'daily') {
        if (chartArgs.chartType === 'Temperature') {
          histArgs.elems = ['maxt', 'mint', 'avgt'];
        } else if (chartArgs.chartType === 'Precipitation') {
          histArgs.elems = ['pcpn'];
        }
      } else if (interval === 'monthly') {
        if (chartArgs.chartType === 'Temperature') {
          histArgs.elems = 'mly_max_maxt,mly_min_mint,mly_mean_avgt';
        } else if (chartArgs.chartType) {
          histArgs.elems = 'mly_sum_pcpn';
        }
      }

      dispatch(fetchHistData(histArgs));
    }
  }, [stationsStatus, stations, interval, stnIndex, chartArgs, dispatch]);

  // Update the interval when changing interval (By Day/By Month)
  const handleIntervalChange = (eventKey, event) => {
    event.persist();
    setInterval(eventKey);
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
            onClick={(e) => setStnIndex(e.target.value)}
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
        <Nav variant="pills" defaultActiveKey="daily" onSelect={handleIntervalChange}>
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
          {stationsStatus === 'succeeded'
            ? compose(startCase, toLower)(stations[stnIndex].name)
            : ''}{' '}
        </Card.Title>
        {chartArgs.chartType === 'Temperature' ? <TempGraph /> : <PrecipGraph />}
      </Card.Body>
    </Card>
  );
};

GraphSelect.propTypes = {
  chartArgs: PropTypes.object,
};
export default GraphSelect;
