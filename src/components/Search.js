import React, { useState, useEffect, useRef } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './Search.css';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const KEY = 'AIzaSyCjQg02of0xlwfpvo4v-GQZ7VxSaNRHBLM';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleMapsReady: false,
      address: '',
    };
  }

  componentDidMount() {
    this.loadGoogleMaps(() => {
      this.setState({ googleMapsReady: true });
    });
  }

  componentWillUnmount() {
    this.unloadGoogleMaps();
  }

  // Load the google maps api script
  loadGoogleMaps = (callback) => {
    const existingScript = document.getElementById('googlePlacesScript');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCjQg02of0xlwfpvo4v-GQZ7VxSaNRHBLM&libraries=places';
      script.id = 'googlePlacesScript';
      document.body.appendChild(script);
      //action to do after a script is loaded in our case setState
      script.onload = () => {
        if (callback) callback();
      };
    }
    if (existingScript && callback) callback();
  };

  unloadGoogleMaps = () => {
    let googlePlacesScript = document.getElementById('googlePlacesScript');
    if (googlePlacesScript) {
      googlePlacesScript.remove();
    }
  };

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  };

  render() {
    if (!this.state.googleMapsReady) {
      return <p>Loading</p>;
    }
    const searchOptions = {
      componentRestrictions: { country: 'us' },
      types: ['(cities)'],
    };
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default Search;
