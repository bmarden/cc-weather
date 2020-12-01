import React, { useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

import { fetchCurWx } from '../currentWx/currentWxSlice';
import { updatePlace } from './searchSlice';
import './Search.css';
/* global google */

const Search = () => {
  const dispatch = useDispatch();
  const placeStatus = useSelector((state) => state.search.status);

  // Initialize options for Autocomplete
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: 'us',
      },
      types: ['(cities)'],
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = useCallback(
    (val) => {
      setValue(val, false);
      dispatch(fetchCurWx(val));

      // Get latitude and longitude via utility functions
      getGeocode({ address: val })
        .then((results) => {
          // Constants used to calculate bounds distance
          const expandDistance = 10 * 1609.34; // Convert 10 miles to meters
          const points = { n: 0, e: 90, s: 180, w: 270 };

          // Get the location object from Google places
          const latLng = results[0].geometry.location;

          // Calculate the offset from latLng. Although Google places includes a bounds object, we are expanding the area
          for (let i in points) {
            points[i] = google.maps.geometry.spherical.computeOffset(
              latLng,
              expandDistance,
              points[i]
            );
          }
          // Construct object to update place in Redux store
          const place = {
            city: results[0].formatted_address,
            coords: {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            },
            bounds: `${points.w.lng()},${points.s.lat()},${points.e.lng()}, ${points.n.lat()}`,
          };
          dispatch(updatePlace(place));
        })
        .catch((error) => {
          console.log('😱 Error: ', error);
        });
    },
    [dispatch, setValue]
  );

  // Load initial location on page load
  useEffect(() => {
    if (placeStatus === 'idle') {
      handleSelect('San Francisco, CA, USA');
      setValue('', false);
    }
  }, [handleSelect, placeStatus, setValue]);

  const renderSuggestions = () => {
    const suggestions = data.map(({ place_id, description }) => (
      <ComboboxOption key={place_id} value={description} />
    ));
    return (
      <>
        {suggestions}
        <img
          src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
          alt="Powered by Google"
        />
      </>
    );
  };

  return (
    <Container className="mt-3 mb-3">
      <div className="d-flex justify-content-center">
        <Combobox onSelect={handleSelect} aria-labelledby="search">
          <ComboboxInput
            placeholder="Search for a city"
            value={value}
            onChange={handleInput}
            disabled={!ready}
            selectOnClick={true}
            className="form-control search"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === 'OK' && renderSuggestions()}{' '}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    </Container>
  );
};

export default Search;
