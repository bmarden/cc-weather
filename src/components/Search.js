import React, { useState, useEffect, useRef } from 'react';
import './Search.css';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const KEY = '';

const Search = ({ setDailyForecast }) => {
  const [term, setTerm] = useState('Chico, CA, USA');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  // const [results, setResults] = useState([]);

  // Wait for
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    // Reset the debounce timer
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    if (debouncedTerm === '') {
      return;
    }
    axios
      .get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          q: debouncedTerm,
          units: 'imperial',
          appid: process.env.REACT_APP_OW_API_KEY,
        },
      })
      .then((response) => {
        setDailyForecast(response);
      });
  }, [debouncedTerm]);

  // const handleTerm = (event) => {
  //   console.log(event.target.value);
  // };

  return (
    <div>
      <Form inline>
        <FormControl
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          type="text"
          placeholder="Search"
          className="mr-sm-2"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </div>
  );
};

export default Search;
