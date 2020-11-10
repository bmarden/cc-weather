import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Historical = () => {
  const tempData = useSelector((state) => state.histWx.tempData);
  const tempDataStatus = useSelector((state) => state.histWx.tempDataStatus);
  let options;
  let content;

  if (tempDataStatus === 'succeeded') {
    const tData = tempData[1];
    options = {
      title: {
        text: 'Temperature Chart',
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          month: '%e. %b',
          year: '%b',
        },
        title: {
          text: 'Date',
        },
      },
      series: [
        {
          name: 'Minimum Temperature',
          data: tData,
        },
      ],
    };
    content = <HighchartsReact highcharts={Highcharts} options={options} />;
  } else {
    content = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return <>{content}</>;
};

export default Historical;
