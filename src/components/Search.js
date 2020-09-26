import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const KEY = 'AIzaSyCjQg02of0xlwfpvo4v-GQZ7VxSaNRHBLM';

const Search = ({ onSearchSubmit }) => {
  const [term, setTerm] = useState('');

  const onSubmit = (event) => {
    // Prevent the page from reloading when pressing enter
    event.preventDefault();

    on;
  };
  return (
    <div>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Enter a City"
          className="mr-sm-2"
        />
        <Button size="sm" variant="outline-info">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default Search;
