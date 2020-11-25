import React, { useEffect } from 'react';
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
import { fetchStationData, fetchHistTemp } from './histWxSlice';
import Historical from '../historicalWx/Historical';

const GraphSelect = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const stations = useSelector((state) => state.histWx.stations);

  useEffect(() => {
    if (search.status === 'loaded') {
      dispatch(fetchStationData(search.place.bounds));
    }
  }, [search, dispatch]);

  useEffect(() => {
    if (stations) {
      dispatch(fetchHistTemp());
    }
  }, [stations, dispatch]);

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
                Date Range: {stn.valid_daterange[0][0]} -{' '}
                {stn.valid_daterange[0][1]}
              </Popover.Content>
            </Popover>
          }
        >
          <Dropdown.Item key={stn.uid}>{stn.name.toLowerCase()}</Dropdown.Item>
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
          <DropdownButton className="ml-auto" title="stations" as={NavItem}>
            {renderStations()}
          </DropdownButton>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Title>Historical Data</Card.Title>
        <Historical />
      </Card.Body>
    </Card>
  );
};

export default GraphSelect;
