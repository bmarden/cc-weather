import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import useScript from '../../common/hooks/useScript';

import { fetchCurWx } from '../currentWx/currentWxSlice';
import { updatePlace } from './searchSlice';
import './Search.css';
/* global google */

const Search = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('Chico, CA, USA');
  const searchBarRef = useRef(null);
  const autoComplete = useRef(null);
  const [mapsSrcLoaded, error] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places,geometry`
  );

  const handlePlaceSelect = useCallback(
    async (updateQuery) => {
      const place = autoComplete.current.getPlace();
      const query = place.formatted_address;
      const latLng = place.geometry.location;

      // Some variables to help expand the lat, lng returned from Places API
      const expandDist = 10 * 1609.34; // Convert 10 miles to meters

      const points = { n: 0, e: 90, s: 180, w: 270 };

      // Use Google geometry library to calculate offset from center latLng returned from search
      for (let i in points) {
        points[i] = google.maps.geometry.spherical.computeOffset(
          latLng,
          expandDist,
          points[i]
        );
      }
      const bounds = `${points.w.lng()},${points.s.lat()},${points.e.lng()}, ${points.n.lat()}`;

      updateQuery(query);
      let placeObject = {
        city: place.address_components[0].long_name,
        county: place.address_components[1].long_name,
        state: place.address_components[2].long_name,
        formatted_address: place.formatted_address,
        coords: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        bounds: bounds,
      };

      dispatch(updatePlace(placeObject));
    },
    [dispatch]
  );

  useEffect(() => {
    if (mapsSrcLoaded) {
      autoComplete.current = new window.google.maps.places.Autocomplete(
        searchBarRef.current,
        { types: ['(cities)'], componentRestrictions: { country: 'us' } }
      );
      autoComplete.current.setFields([
        'address_components',
        'formatted_address',
        'geometry',
      ]);
      autoComplete.current.addListener('place_changed', () =>
        handlePlaceSelect(setTerm)
      );
    }
  }, [mapsSrcLoaded, handlePlaceSelect]);

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(fetchCurWx(term));
    }
  };

  return (
    <>
      <div className="search-location-input">
        <Form inline>
          <FormControl
            ref={searchBarRef}
            className="mr-sm-2"
            type="text"
            value={term}
            placeholder="Search"
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={handleSubmit}
          />
          <Button
            variant="outline-success"
            onClick={(e) => dispatch(fetchCurWx(term))}
          >
            Search
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Search;
