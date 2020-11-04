import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStationData, fetchHistTemp } from './histWxSlice';

const GraphSelect = () => {
  const dispatch = useDispatch();
  const place = useSelector((state) => state.place);
  const stations = useSelector((state) => state.histWx.stations);

  useEffect(() => {
    if (place[0]) {
      dispatch(fetchStationData(place[0].bounds));
    }
  }, [place, dispatch]);

  useEffect(() => {
    if (stations) {
      dispatch(fetchHistTemp());
    }
  }, [stations, dispatch]);

  return <div>Graph Select</div>;
};

export default GraphSelect;
