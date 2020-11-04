import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistTemp, fetchStationData } from './histWxSlice';

const Historical = () => {
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

  return <div>Historical </div>;
};

export default Historical;
