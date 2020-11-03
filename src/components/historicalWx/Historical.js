import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStationData, fetchStationDataAcis } from './histWxSlice';

const Historical = () => {
  const dispatch = useDispatch();
  const place = useSelector((state) => state.place);

  useEffect(() => {
    if (place[0]) {
      dispatch(fetchStationDataAcis(place[0].bounds));
      console.log(place[0].bounds);
    }
  }, [place, dispatch]);

  return <div>Historical </div>;
};

export default Historical;
