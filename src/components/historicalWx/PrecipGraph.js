import React from 'react';

import { useSelector } from 'react-redux';
import { Ring } from 'react-spinners-css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const PrecipGraph = () => {
  const data = useSelector((state) => state.histWx.tempData);
  const dataStatus = useSelector((state) => state.histWx.tempDataStatus);

  let options;
  let content;
  if (dataStatus === 'succeeded') {
    const pcpnData = data[0];
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
      series: [
        {
          name: 'Precipitation Data',
          data: pcpnData,
        },
      ],
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
