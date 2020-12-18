import React from 'react';

import { useSelector } from 'react-redux';
import { Ring } from 'react-spinners-css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const PrecipGraph = () => {
  const precipDataStatus = useSelector((state) => state.precipDataStatus);
  let options;
  let content;
  if (precipDataStatus === 'succeeded') {
    options = {
      title: {
        text: 'Precipitation Chart',
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date',
        },
      },
      yAxis: {
        title: {
          text: 'Precipitation in inches',
        },
      },
      series: [{}],
    };
    content = (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    );
  } else {
    content = (
      <div className="d-flex justify-content-center">
        <Ring color="#023e8aff">
          <span className="sr-only">Loading...</span>
        </Ring>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default PrecipGraph;
