import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStationData, fetchHistTemp } from './histWxSlice';

const GraphSelect = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const stations = useSelector((state) => state.histWx.stations);

  useEffect(() => {
    if (search.status === 'loaded') {
      dispatch(fetchStationData(search.place.bounds));
    }
  }, [search, dispatch]);

  useEffect(() => {
    if (stations) {
      dispatch(fetchHistTemp());
    }
  }, [stations, dispatch]);

  return <div>Graph Select</div>;
};

export default GraphSelect;
