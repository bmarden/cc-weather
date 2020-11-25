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
import Historical from '../historicalWx/Historical';

const GraphSelect = () => {
  const dispatch = useDispatch();
  const [station, setStation] = useState('');
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

  // When station data has been received, get temperature data and set current station
  useEffect(() => {
    if (stationsStatus === 'succeeded') {
      setStation(compose(startCase, toLower)(stations[0].name));
      dispatch(fetchHistTemp(stations[0].sids[0]));
    }
  }, [stationsStatus, stations, dispatch]);

  const handleStationSelect = (e) => {
    setStation(e.target.textContent);
    console.log(e.target.value);
    dispatch(fetchHistTemp(e.target.value));
  };

  // Display a tooltip on each station with details
  const renderStations = () => {
    if (stations) {
      const items = stations.map((stn) => (
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
            value={stn.sids[0]}
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
        <Nav variant="pills" defaultActiveKey="#daily">
          <Nav.Item>
            <Nav.Link href="#daily">By Day</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#monthly">By Month</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#yearly">By Year</Nav.Link>
          </Nav.Item>
          <DropdownButton className="ml-auto" title="Stations" as={NavItem}>
            {renderStations()}
          </DropdownButton>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <strong>Weather Station:</strong> {station}{' '}
        </Card.Title>
        <Historical />
      </Card.Body>
    </Card>
  );
};

export default GraphSelect;
