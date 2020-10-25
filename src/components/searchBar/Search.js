import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { loadGoogleMapsApi } from '../../api/places';
import { fetchCurWx } from '../currentWx/currentWxSlice';
import './Search.css';

const Search = () => {
  const [term, setTerm] = useState('');
  const searchBarRef = useRef(null);
  const autoComplete = useRef(null);

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log(addressObject);
    console.log(addressObject.geometry.location.lat());
  }

  useEffect(() => {
    loadGoogleMapsApi(() => {
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
    });
  }, []);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(fetchCurWx(term));
    }
  };

  return (
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
  );
};

export default Search;
