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

import { updatePlace } from './searchSlice';
import useCurLocation from '../../common/hooks/useCurLocation';
import './Search.css';
import { fetchWeather } from '../weather/weatherSlice';
/* global google */

const Search = () => {
  const dispatch = useDispatch();
  const placeStatus = useSelector((state) => state.search.status);
  const { location, error } = useCurLocation();

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

  /**  handleSelect - Handles when a location is selected from Google AutoComplete 
  @val - Can have two values based on context of the call. If selection made from autocompplete dropdown
         then this will be a city address: Cityname, State, USA. If page is initially loading, this will be an
         object holding a latitude longitude.
  @isCoords - If true, then val is a lat lng object. If false or undefined then val is a string containing the city address
  **/
  const handleSelect = useCallback(
    (val, isCoords) => {
      let geoArg;
      if (isCoords) {
        geoArg = {
          location: {
            lat: val.latitude,
            lng: val.longitude,
          },
        };
      } else if (!isCoords) {
        setValue(val, false);
        geoArg = {
          address: val,
        };
      }

      // Get latitude and longitude via utility functions
      getGeocode(geoArg)
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
          const geo = results.find((loc) => {
            return loc.types.some((type) => {
              return type === 'locality' || type === 'postal_code';
            });
          });
          // Construct object to update place in Redux store
          const place = {
            city: geo.formatted_address,
            coords: {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            },
            bounds: `${points.w.lng()},${points.s.lat()},${points.e.lng()}, ${points.n.lat()}`,
          };
          dispatch(updatePlace(place));
          dispatch(fetchWeather({ lat: place.coords.lat, lon: place.coords.lng }));
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
    },
    [dispatch, setValue]
  );

  // Load initial location on page load
  useEffect(() => {
    if (location && placeStatus === 'idle') {
      handleSelect(location, true);
      setValue('', false);
    } else if (placeStatus === 'idle' && error) {
      handleSelect('San Francisco, CA, USA', false);
      setValue('', false);
    }
  }, [handleSelect, placeStatus, location, error, setValue]);

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
            <ComboboxList>{status === 'OK' && renderSuggestions()} </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    </Container>
  );
};

export default Search;
