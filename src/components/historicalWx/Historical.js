import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistTemp, fetchStationData } from './histWxSlice';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Historical = () => {
  const dispatch = useDispatch();
  const place = useSelector((state) => state.place);
  const stations = useSelector((state) => state.histWx.stations);

  const options = {
    title: {
      text: 'My chart',
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };
  // useEffect(() => {
  //   if (place[0]) {
  //     dispatch(fetchStationData(place[0].bounds));
  //   }
  // }, [place, dispatch]);

  // useEffect(() => {
  //   if (stations) {
  //     dispatch(fetchHistTemp());
  //   }
  // }, [stations, dispatch]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Historical;
