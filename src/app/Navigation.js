import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ccweather from '../assets/cc-weather.png';
import './NavBar.css';
import {
  Button,
  Container,
  Dropdown,
  Grid,
  Header,
  Icon,
  Menu,
  Message,
  Image,
} from 'semantic-ui-react';

const Navigation = () => {
  const [menuStyle, setMenuStyle] = useState({ display: 'none' });

  const handleToggleDropdownMenu = () => {
    if (menuStyle.display === 'none') {
      setMenuStyle({ display: 'block' });
    } else {
      setMenuStyle({ display: 'none' });
    }
  };
  return (
    <Container>
      <Grid padded className="tablet computer only">
        <Menu borderless fluid>
          <Menu.Item>
            <Image size="mini" src={ccweather} />
          </Menu.Item>
          <Menu.Item header as={Link} to="/">
            CC Weather
          </Menu.Item>
          <Menu.Item as={NavLink} to="/hourly-weather">
            Hourly Weather
          </Menu.Item>
          <Menu.Item as={NavLink} to="/daily-weather">
            Daily Weather
          </Menu.Item>
          <Menu.Item as={NavLink} to="/historical-weather">
            Historical Weather
          </Menu.Item>
        </Menu>
      </Grid>

      <Grid padded className="mobile only">
        <Menu borderless fluid>
          <Menu.Item header as={Link} to="/">
            CC Weather
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button icon basic toggle onClick={handleToggleDropdownMenu}>
                <Icon name="content" />
              </Button>
            </Menu.Item>
          </Menu.Menu>
          <Menu vertical borderless fluid style={menuStyle}>
            <Menu.Item as={NavLink} to="/hourly-weather">
              Hourly Weather
            </Menu.Item>
            <Menu.Item as={NavLink} to="daily-weather">
              Daily Weather
            </Menu.Item>
            <Menu.Item as={NavLink} to="historical-weather">
              Historical Weather
            </Menu.Item>
          </Menu>
        </Menu>
      </Grid>
    </Container>
  );
};

export default Navigation;
