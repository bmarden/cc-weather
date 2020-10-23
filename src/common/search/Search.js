import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import './Search.css';
import { fetchCurWx } from '../../components/currentWx/currentWxSlice';

const Search = () => {
  const [term, setTerm] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(fetchCurWx(term));
    }
  };
  return (
    <>
      <Form inline>
        <FormControl
          className="mr-sm-2"
          type="text"
          value={term}
          placeholder="Search"
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleSubmit}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </>
  );
};

export default Search;
