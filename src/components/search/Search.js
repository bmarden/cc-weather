import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import useScript from '../../common/hooks/useScript';

import { fetchCurWx } from '../currentWx/currentWxSlice';
import { updatedPlace } from './searchSlice';
import './Search.css';

const Search = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const searchBarRef = useRef(null);
  const autoComplete = useRef(null);
  const [mapsSrcLoaded, error] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`
  );

  const handlePlaceSelect = useCallback(
    async (updateQuery) => {
      const place = autoComplete.current.getPlace();
      const query = place.formatted_address;

      // Get the location's bounds if they exist, and set
      let bounds = new window.google.maps.LatLngBounds();
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

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
        bounds: bounds.toUrlValue(),
      };

      dispatch(updatedPlace(placeObject));
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
          <Button variant="outline-success">Search</Button>
        </Form>
      </div>
    </>
  );
};

export default Search;
