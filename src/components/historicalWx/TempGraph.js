import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { Ring } from 'react-spinners-css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const Historical = () => {
  const tempData = useSelector((state) => state.histWx.tempData);
  const tempDataStatus = useSelector((state) => state.histWx.tempDataStatus);
  let options;
  let content;

  if (tempDataStatus === 'succeeded') {
    const maxTempData = tempData[0];
    const minTempData = tempData[1];
    const avgTempData = tempData[2];

    options = {
      title: {
        text: 'Temperature Chart',
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date',
        },
      },
      yAxis: {
        title: {
          text: 'Temperature in Fahrenheit',
        },
      },
      series: [
        {
          name: 'Minimum Temperature',
          data: minTempData,
          color: '#34a4eb',
        },
        {
          name: 'Maximum Temperature',
          data: maxTempData,
          color: '#eb5934',
        },
        {
          name: 'Average Temperature',
          data: avgTempData,
          color: '#27a81e',
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

  return (
    <>
      <Container>{content}</Container>
    </>
  );
};

export default Historical;
